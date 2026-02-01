import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BookerPayload {
  type: "booker";
  email: string;
  name: string;
  school: string;
  services_wanted: string[];
  budget: string;
  frequency: string;
}

interface ProviderPayload {
  type: "provider";
  email: string;
  name: string;
  school: string;
  provider_tier: "beauty-school" | "independent";
  services_offered: string[];
  availability: string[];
  // Beauty School specific
  beauty_school_name?: string;
  enrollment_proof_type?: string;
  // Independent specific
  id_verification_consent?: boolean;
  portfolio_link?: string;
  background_check_consent?: boolean;
}

type WaitlistPayload = BookerPayload | ProviderPayload;

/**
 * Calculate interest score based on user responses
 * 
 * Booker scoring (max 8 points):
 * - +2 for multiple services (3+)
 * - +2 for weekly/biweekly frequency
 * - +2 for higher budget ($50+)
 * - +2 for being from an active campus
 * 
 * Provider scoring (max 10 points):
 * - +3 for independent tier (more verification = higher trust)
 * - +2 for portfolio link provided
 * - +2 for multiple services (3+)
 * - +2 for high availability (4+ slots)
 * - +1 for background check consent
 */
function calculateInterestScore(payload: WaitlistPayload): number {
  let score = 0;

  if (payload.type === "booker") {
    const booker = payload as BookerPayload;
    
    // +2 for multiple services
    if (booker.services_wanted.length >= 3) {
      score += 2;
    } else if (booker.services_wanted.length >= 2) {
      score += 1;
    }

    // +2 for high frequency
    if (booker.frequency === "weekly" || booker.frequency === "biweekly") {
      score += 2;
    } else if (booker.frequency === "monthly") {
      score += 1;
    }

    // +2 for higher budget
    if (booker.budget === "over100") {
      score += 2;
    } else if (booker.budget === "50to100") {
      score += 1;
    }

    // Base engagement score
    score += 1;

  } else if (payload.type === "provider") {
    const provider = payload as ProviderPayload;

    // +3 for independent tier (higher verification standards)
    if (provider.provider_tier === "independent") {
      score += 3;
      
      // +2 for portfolio
      if (provider.portfolio_link && provider.portfolio_link.trim() !== "") {
        score += 2;
      }
      
      // +1 for background check consent
      if (provider.background_check_consent) {
        score += 1;
      }
    } else {
      // Beauty school gets base points
      score += 2;
    }

    // +2 for multiple services
    if (provider.services_offered.length >= 3) {
      score += 2;
    } else if (provider.services_offered.length >= 2) {
      score += 1;
    }

    // +2 for high availability
    if (provider.availability.length >= 4) {
      score += 2;
    } else if (provider.availability.length >= 2) {
      score += 1;
    }
  }

  return score;
}

export async function POST(request: NextRequest) {
  try {
    const payload: WaitlistPayload = await request.json();

    // Validate required fields
    if (!payload.email || !payload.name || !payload.school || !payload.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Calculate interest score
    const interestScore = calculateInterestScore(payload);

    // Prepare data for Supabase
    const insertData: Record<string, any> = {
      email: payload.email.toLowerCase().trim(),
      name: payload.name.trim(),
      school: payload.school.trim(),
      user_type: payload.type,
      interest_score: interestScore,
      created_at: new Date().toISOString(),
    };

    if (payload.type === "booker") {
      const booker = payload as BookerPayload;
      insertData.services_wanted = booker.services_wanted;
      insertData.budget = booker.budget;
      insertData.frequency = booker.frequency;
    } else if (payload.type === "provider") {
      const provider = payload as ProviderPayload;
      insertData.provider_tier = provider.provider_tier;
      insertData.services_offered = provider.services_offered;
      insertData.availability = provider.availability;

      if (provider.provider_tier === "beauty-school") {
        insertData.beauty_school_name = provider.beauty_school_name;
        insertData.enrollment_proof_type = provider.enrollment_proof_type;
      } else if (provider.provider_tier === "independent") {
        insertData.id_verification_consent = provider.id_verification_consent;
        insertData.portfolio_link = provider.portfolio_link;
        insertData.background_check_consent = provider.background_check_consent;
      }
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("waitlist")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on the waitlist!" },
          { status: 409 }
        );
      }

      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to join waitlist. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        interest_score: interestScore,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("waitlist")
      .select("email, name, user_type, provider_tier, created_at")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ on_waitlist: false }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json(
      {
        on_waitlist: true,
        user_type: data.user_type,
        provider_tier: data.provider_tier,
        joined_at: data.created_at,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
