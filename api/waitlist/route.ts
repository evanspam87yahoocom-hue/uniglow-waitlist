import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface BookerPayload {
  type: "booker";
  email: string;
  school: string;
  services_wanted: string[];
  budget: string;
  frequency: string;
  timeline: string;
}

interface ProviderPayload {
  type: "provider";
  email: string;
  school: string;
  services_offered: string[];
  experience: string;
  portfolio_link: string | null;
  availability: string[];
  background_check: string;
  start_date: string;
}

type WaitlistPayload = BookerPayload | ProviderPayload;

/**
 * Calculate interest score based on user responses
 * 
 * Booker scoring:
 * - +3 for ASAP timeline
 * - +2 for 2-3x/month frequency
 * - +2 for multiple services (2+)
 * - +1 for higher budget (50-100 or over100)
 * 
 * Provider scoring:
 * - +3 for ASAP start date
 * - +2 for having a portfolio
 * - +2 for intermediate/advanced/licensed experience
 * - +1 for background check = yes
 */
function calculateInterestScore(payload: WaitlistPayload): number {
  let score = 0;

  if (payload.type === "booker") {
    // +3 ASAP timeline
    if (payload.timeline === "asap") {
      score += 3;
    }

    // +2 for 2-3x/month frequency
    if (payload.frequency === "2to3monthly") {
      score += 2;
    }

    // +2 for multiple services (2+)
    if (payload.services_wanted.length >= 2) {
      score += 2;
    }

    // +1 for higher budget
    if (payload.budget === "50to100" || payload.budget === "over100") {
      score += 1;
    }
  } else if (payload.type === "provider") {
    // +3 ASAP start date
    if (payload.start_date === "asap") {
      score += 3;
    }

    // +2 for having a portfolio
    if (payload.portfolio_link && payload.portfolio_link.trim() !== "") {
      score += 2;
    }

    // +2 for intermediate/advanced/licensed experience
    if (
      payload.experience === "intermediate" ||
      payload.experience === "advanced" ||
      payload.experience === "licensed"
    ) {
      score += 2;
    }

    // +1 for background check yes
    if (payload.background_check === "yes") {
      score += 1;
    }
  }

  return score;
}

export async function POST(request: NextRequest) {
  try {
    const payload: WaitlistPayload = await request.json();

    // Validate required fields
    if (!payload.email || !payload.school || !payload.type) {
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
    const insertData = {
      email: payload.email.toLowerCase().trim(),
      school: payload.school.trim(),
      user_type: payload.type,
      interest_score: interestScore,
      created_at: new Date().toISOString(),
      
      // Booker-specific fields
      services_wanted: payload.type === "booker" ? payload.services_wanted : null,
      budget: payload.type === "booker" ? (payload as BookerPayload).budget : null,
      frequency: payload.type === "booker" ? (payload as BookerPayload).frequency : null,
      timeline: payload.type === "booker" ? (payload as BookerPayload).timeline : null,
      
      // Provider-specific fields
      services_offered: payload.type === "provider" ? (payload as ProviderPayload).services_offered : null,
      experience: payload.type === "provider" ? (payload as ProviderPayload).experience : null,
      portfolio_link: payload.type === "provider" ? (payload as ProviderPayload).portfolio_link : null,
      availability: payload.type === "provider" ? (payload as ProviderPayload).availability : null,
      background_check: payload.type === "provider" ? (payload as ProviderPayload).background_check : null,
      start_date: payload.type === "provider" ? (payload as ProviderPayload).start_date : null,
    };

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

// Also handle GET requests to check waitlist status
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
      .select("email, user_type, created_at")
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
