"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
type UserType = "booker" | "provider" | null;
type ProviderTier = "beauty-school" | "independent" | null;

interface FormErrors {
  email?: string;
  name?: string;
  school?: string;
  services?: string;
  budget?: string;
  frequency?: string;
  providerTier?: string;
  schoolName?: string;
  enrollmentProof?: string;
  idVerification?: string;
  portfolio?: string;
  backgroundCheck?: string;
  availability?: string;
}

// Constants
const SERVICES = [
  { id: "hair", label: "Hair Styling & Braiding", emoji: "💇‍♀️" },
  { id: "nails", label: "Nails & Manicures", emoji: "💅" },
  { id: "lashes", label: "Lashes & Brows", emoji: "👁️" },
  { id: "makeup", label: "Makeup & Glam", emoji: "💄" },
  { id: "skincare", label: "Skincare & Facials", emoji: "✨" },
  { id: "waxing", label: "Waxing & Threading", emoji: "🌸" },
];

const BUDGET_OPTIONS = [
  { id: "under25", label: "Under $25" },
  { id: "25to50", label: "$25 - $50" },
  { id: "50to100", label: "$50 - $100" },
  { id: "over100", label: "$100+" },
];

const FREQUENCY_OPTIONS = [
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Every 2 weeks" },
  { id: "monthly", label: "Monthly" },
  { id: "occasionally", label: "Occasionally" },
];

const AVAILABILITY_OPTIONS = [
  { id: "weekday_morning", label: "Weekday Mornings" },
  { id: "weekday_afternoon", label: "Weekday Afternoons" },
  { id: "weekday_evening", label: "Weekday Evenings" },
  { id: "weekend_morning", label: "Weekend Mornings" },
  { id: "weekend_afternoon", label: "Weekend Afternoons" },
  { id: "weekend_evening", label: "Weekend Evenings" },
];

// Pomegranate Logo Component
function PomegranateLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer pomegranate shape */}
      <path
        d="M24 4C14 4 8 14 8 24C8 34 14 44 24 44C34 44 40 34 40 24C40 14 34 4 24 4Z"
        fill="url(#pomGradient)"
      />
      {/* Crown/calyx */}
      <path
        d="M24 4C24 4 22 2 20 2C18 2 17 3 17 4C17 5 18 6 20 6C21 6 22 5 22 5L24 4L26 5C26 5 27 6 28 6C30 6 31 5 31 4C31 3 30 2 28 2C26 2 24 4 24 4Z"
        fill="#6B1023"
      />
      {/* Seeds pattern */}
      <circle cx="18" cy="20" r="3" fill="#FEE2E2" fillOpacity="0.8" />
      <circle cx="24" cy="16" r="2.5" fill="#FEE2E2" fillOpacity="0.7" />
      <circle cx="30" cy="20" r="3" fill="#FEE2E2" fillOpacity="0.8" />
      <circle cx="16" cy="28" r="2.5" fill="#FEE2E2" fillOpacity="0.6" />
      <circle cx="24" cy="26" r="3.5" fill="#FEE2E2" fillOpacity="0.9" />
      <circle cx="32" cy="28" r="2.5" fill="#FEE2E2" fillOpacity="0.6" />
      <circle cx="20" cy="34" r="2" fill="#FEE2E2" fillOpacity="0.5" />
      <circle cx="28" cy="34" r="2" fill="#FEE2E2" fillOpacity="0.5" />
      {/* Highlight */}
      <ellipse cx="16" cy="14" rx="4" ry="3" fill="white" fillOpacity="0.2" />
      <defs>
        <linearGradient id="pomGradient" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C41E3A" />
          <stop offset="0.5" stopColor="#A31831" />
          <stop offset="1" stopColor="#831328" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Tier Badge Component
function TierBadge({ tier }: { tier: ProviderTier }) {
  if (tier === "beauty-school") {
    return (
      <span className="badge badge-beauty-school">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
        Beauty School Student
      </span>
    );
  }
  if (tier === "independent") {
    return (
      <span className="badge badge-independent">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        Independent Provider
      </span>
    );
  }
  return null;
}

// Tier Info Component
function TierInfo({ tier }: { tier: ProviderTier }) {
  if (tier === "beauty-school") {
    return (
      <div className="tier-info-card beauty-school animate-fade-in">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blush-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-seed-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-seed-800">Beauty School Student</h4>
            <p className="text-sm text-seed-600">Currently enrolled in a cosmetology or beauty program</p>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-seed-700 mb-1">✓ Requirements</p>
            <ul className="text-seed-600 space-y-1 ml-4">
              <li>• Proof of enrollment in accredited beauty school</li>
              <li>• Valid student ID</li>
              <li>• No license required (supervised training)</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-seed-700 mb-1">✓ Allowed Services</p>
            <p className="text-seed-600 ml-4">Services within your current training curriculum</p>
          </div>
          <div className="p-3 bg-white/60 rounded-xl">
            <p className="text-xs text-seed-500">
              <strong>Trust Disclosure:</strong> Clients will see that you're a beauty school student gaining supervised experience.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (tier === "independent") {
    return (
      <div className="tier-info-card independent animate-fade-in">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-pomegranate-200 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-pomegranate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-pomegranate-800">Independent Provider</h4>
            <p className="text-sm text-pomegranate-600">Self-taught or experienced student offering services</p>
          </div>
        </div>
        
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-pomegranate-700 mb-1">✓ Requirements</p>
            <ul className="text-pomegranate-600 space-y-1 ml-4">
              <li>• Valid government ID verification</li>
              <li>• Portfolio submission (photos of your work)</li>
              <li>• Background check consent</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-pomegranate-700 mb-1">✓ Allowed Services</p>
            <p className="text-pomegranate-600 ml-4">Services you're experienced in (subject to state regulations)</p>
          </div>
          <div className="p-3 bg-white/60 rounded-xl">
            <p className="text-xs text-pomegranate-500">
              <strong>Trust Disclosure:</strong> Clients will see your verification status and portfolio. You're responsible for any applicable licensing requirements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default function WaitlistPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Common fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");

  // Booker fields
  const [servicesWanted, setServicesWanted] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [frequency, setFrequency] = useState("");

  // Provider fields
  const [providerTier, setProviderTier] = useState<ProviderTier>(null);
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  
  // Beauty School specific
  const [beautySchoolName, setBeautySchoolName] = useState("");
  const [enrollmentProofType, setEnrollmentProofType] = useState("");
  
  // Independent specific
  const [idVerificationConsent, setIdVerificationConsent] = useState(false);
  const [portfolioLink, setPortfolioLink] = useState("");
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Common validations
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!school.trim()) {
      newErrors.school = "School name is required";
    }

    // Booker validations
    if (userType === "booker") {
      if (servicesWanted.length === 0) {
        newErrors.services = "Please select at least one service";
      }
      if (!budget) {
        newErrors.budget = "Please select your budget range";
      }
      if (!frequency) {
        newErrors.frequency = "Please select how often you'd book";
      }
    }

    // Provider validations
    if (userType === "provider") {
      if (!providerTier) {
        newErrors.providerTier = "Please select your provider type";
      }

      if (servicesOffered.length === 0) {
        newErrors.services = "Please select at least one service you offer";
      }

      if (availability.length === 0) {
        newErrors.availability = "Please select your availability";
      }

      // Beauty School specific
      if (providerTier === "beauty-school") {
        if (!beautySchoolName.trim()) {
          newErrors.schoolName = "Beauty school name is required";
        }
        if (!enrollmentProofType) {
          newErrors.enrollmentProof = "Please select how you'll verify enrollment";
        }
      }

      // Independent specific
      if (providerTier === "independent") {
        if (!idVerificationConsent) {
          newErrors.idVerification = "ID verification consent is required";
        }
        if (!portfolioLink.trim()) {
          newErrors.portfolio = "Portfolio link is required";
        }
        if (!backgroundCheckConsent) {
          newErrors.backgroundCheck = "Background check consent is required";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      type: userType,
      email,
      name,
      school,
      ...(userType === "booker" && {
        services_wanted: servicesWanted,
        budget,
        frequency,
      }),
      ...(userType === "provider" && {
        provider_tier: providerTier,
        services_offered: servicesOffered,
        availability,
        ...(providerTier === "beauty-school" && {
          beauty_school_name: beautySchoolName,
          enrollment_proof_type: enrollmentProofType,
        }),
        ...(providerTier === "independent" && {
          id_verification_consent: idVerificationConsent,
          portfolio_link: portfolioLink,
          background_check_consent: backgroundCheckConsent,
        }),
      }),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push(`/thanks?type=${userType}${providerTier ? `&tier=${providerTier}` : ""}`);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleService = (serviceId: string, type: "wanted" | "offered") => {
    if (type === "wanted") {
      setServicesWanted((prev) =>
        prev.includes(serviceId)
          ? prev.filter((s) => s !== serviceId)
          : [...prev, serviceId]
      );
    } else {
      setServicesOffered((prev) =>
        prev.includes(serviceId)
          ? prev.filter((s) => s !== serviceId)
          : [...prev, serviceId]
      );
    }
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: undefined }));
    }
  };

  const toggleAvailability = (slot: string) => {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
    if (errors.availability) {
      setErrors((prev) => ({ ...prev, availability: undefined }));
    }
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="pomegranate-blob w-[700px] h-[700px] bg-blush-200/50 -top-64 -left-64 animate-pulse" />
        <div className="pomegranate-blob w-[500px] h-[500px] bg-pomegranate-200/30 top-1/3 -right-48 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="pomegranate-blob w-[400px] h-[400px] bg-tan-200/40 bottom-0 left-1/4 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <PomegranateLogo className="w-10 h-10" />
          <span className="font-display text-2xl font-semibold text-pomegranate-700">
            UniGlow
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-8 md:py-12">
        {/* Hero Section */}
        <header className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-pomegranate-900 mb-4 tracking-tight leading-tight">
            Beauty by students,
            <br />
            <span className="text-pomegranate-500">for students.</span>
          </h1>
          <p className="text-lg md:text-xl text-seed-600 max-w-xl mx-auto leading-relaxed">
            UniGlow connects college students with trusted student providers for
            affordable beauty services like hair, nails, lashes, and makeup.
          </p>
        </header>

        {/* User Type Selection */}
        {!userType && (
          <section className="animate-fade-up stagger-2 opacity-0">
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => setUserType("booker")}
                className="selection-card group text-left"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blush-100 to-tan-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="text-3xl">💆‍♀️</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-pomegranate-800 mb-2">
                    I want to book
                  </h3>
                  <p className="text-seed-500 text-sm flex-grow">
                    Find affordable beauty services from talented students on your campus.
                  </p>
                  <div className="mt-4 flex items-center text-pomegranate-500 font-medium text-sm">
                    Get started
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserType("provider")}
                className="selection-card group text-left"
              >
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pomegranate-100 to-blush-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <span className="text-3xl">💅</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-pomegranate-800 mb-2">
                    I want to provide services
                  </h3>
                  <p className="text-seed-500 text-sm flex-grow">
                    Build your beauty business and earn money doing what you love.
                  </p>
                  <div className="mt-4 flex items-center text-pomegranate-500 font-medium text-sm">
                    Get started
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </section>
        )}

        {/* Dynamic Form */}
        {userType && (
          <section className="animate-scale-in">
            <div className="card p-8 md:p-10">
              {/* Back button */}
              <button
                onClick={() => {
                  setUserType(null);
                  setProviderTier(null);
                  setErrors({});
                }}
                className="flex items-center gap-2 text-seed-500 hover:text-pomegranate-600 mb-6 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pomegranate-100 to-blush-100 flex items-center justify-center">
                  <span className="text-2xl">{userType === "booker" ? "💆‍♀️" : "💅"}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-pomegranate-800">
                    {userType === "booker" ? "Join as a Client" : "Join as a Provider"}
                  </h2>
                  <p className="text-seed-500 text-sm">
                    {userType === "booker"
                      ? "Tell us what beauty services you're looking for"
                      : "Set up your provider profile"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-seed-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearError("name");
                      }}
                      placeholder="First & Last Name"
                      className={`form-input ${errors.name ? "error" : ""}`}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-seed-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearError("email");
                      }}
                      placeholder="your.email@university.edu"
                      className={`form-input ${errors.email ? "error" : ""}`}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-seed-700 mb-2">
                    School / University *
                  </label>
                  <input
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => {
                      setSchool(e.target.value);
                      clearError("school");
                    }}
                    placeholder="e.g., University of San Diego"
                    className={`form-input ${errors.school ? "error" : ""}`}
                  />
                  {errors.school && <p className="error-message">{errors.school}</p>}
                </div>

                {/* Booker-specific fields */}
                {userType === "booker" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-seed-700 mb-3">
                        What services are you interested in? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service.id, "wanted")}
                            className={`checkbox-card ${servicesWanted.includes(service.id) ? "selected" : ""}`}
                          >
                            <input type="checkbox" checked={servicesWanted.includes(service.id)} onChange={() => {}} />
                            <span className="checkbox-indicator">
                              {servicesWanted.includes(service.id) && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </span>
                            <span className="text-xl">{service.emoji}</span>
                            <span className="text-sm font-medium text-seed-700">{service.label}</span>
                          </div>
                        ))}
                      </div>
                      {errors.services && <p className="error-message">{errors.services}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-seed-700 mb-3">
                          Budget per service *
                        </label>
                        <div className="space-y-2">
                          {BUDGET_OPTIONS.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => {
                                setBudget(option.id);
                                clearError("budget");
                              }}
                              className={`radio-card ${budget === option.id ? "selected" : ""}`}
                            >
                              <input type="radio" name="budget" checked={budget === option.id} onChange={() => {}} />
                              <span className="radio-indicator" />
                              <span className="text-sm font-medium text-seed-700">{option.label}</span>
                            </div>
                          ))}
                        </div>
                        {errors.budget && <p className="error-message">{errors.budget}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-seed-700 mb-3">
                          How often would you book? *
                        </label>
                        <div className="space-y-2">
                          {FREQUENCY_OPTIONS.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => {
                                setFrequency(option.id);
                                clearError("frequency");
                              }}
                              className={`radio-card ${frequency === option.id ? "selected" : ""}`}
                            >
                              <input type="radio" name="frequency" checked={frequency === option.id} onChange={() => {}} />
                              <span className="radio-indicator" />
                              <span className="text-sm font-medium text-seed-700">{option.label}</span>
                            </div>
                          ))}
                        </div>
                        {errors.frequency && <p className="error-message">{errors.frequency}</p>}
                      </div>
                    </div>
                  </>
                )}

                {/* Provider-specific fields */}
                {userType === "provider" && (
                  <>
                    {/* Provider Tier Selection */}
                    <div>
                      <label className="block text-sm font-medium text-seed-700 mb-3">
                        Select your provider type *
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div
                          onClick={() => {
                            setProviderTier("beauty-school");
                            clearError("providerTier");
                          }}
                          className={`selection-card ${providerTier === "beauty-school" ? "selected" : ""}`}
                        >
                          <TierBadge tier="beauty-school" />
                          <h4 className="font-semibold text-seed-800 mt-3 mb-1">Beauty School Student</h4>
                          <p className="text-xs text-seed-500">
                            Currently enrolled in a cosmetology program
                          </p>
                        </div>

                        <div
                          onClick={() => {
                            setProviderTier("independent");
                            clearError("providerTier");
                          }}
                          className={`selection-card ${providerTier === "independent" ? "selected" : ""}`}
                        >
                          <TierBadge tier="independent" />
                          <h4 className="font-semibold text-seed-800 mt-3 mb-1">Independent Provider</h4>
                          <p className="text-xs text-seed-500">
                            Self-taught or experienced in beauty services
                          </p>
                        </div>
                      </div>
                      {errors.providerTier && <p className="error-message">{errors.providerTier}</p>}
                    </div>

                    {/* Tier Info Display */}
                    {providerTier && <TierInfo tier={providerTier} />}

                    {/* Beauty School Specific Fields */}
                    {providerTier === "beauty-school" && (
                      <div className="space-y-4 pt-2">
                        <div>
                          <label htmlFor="beautySchool" className="block text-sm font-medium text-seed-700 mb-2">
                            Beauty School Name *
                          </label>
                          <input
                            type="text"
                            id="beautySchool"
                            value={beautySchoolName}
                            onChange={(e) => {
                              setBeautySchoolName(e.target.value);
                              clearError("schoolName");
                            }}
                            placeholder="e.g., Paul Mitchell The School"
                            className={`form-input ${errors.schoolName ? "error" : ""}`}
                          />
                          {errors.schoolName && <p className="error-message">{errors.schoolName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-seed-700 mb-3">
                            How will you verify enrollment? *
                          </label>
                          <div className="space-y-2">
                            {[
                              { id: "student_id", label: "Student ID Card" },
                              { id: "enrollment_letter", label: "Enrollment Letter" },
                              { id: "transcript", label: "Current Transcript" },
                            ].map((option) => (
                              <div
                                key={option.id}
                                onClick={() => {
                                  setEnrollmentProofType(option.id);
                                  clearError("enrollmentProof");
                                }}
                                className={`radio-card ${enrollmentProofType === option.id ? "selected" : ""}`}
                              >
                                <input type="radio" name="enrollmentProof" checked={enrollmentProofType === option.id} onChange={() => {}} />
                                <span className="radio-indicator" />
                                <span className="text-sm font-medium text-seed-700">{option.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.enrollmentProof && <p className="error-message">{errors.enrollmentProof}</p>}
                        </div>
                      </div>
                    )}

                    {/* Independent Provider Specific Fields */}
                    {providerTier === "independent" && (
                      <div className="space-y-4 pt-2">
                        <div>
                          <label htmlFor="portfolio" className="block text-sm font-medium text-seed-700 mb-2">
                            Portfolio Link *
                          </label>
                          <input
                            type="url"
                            id="portfolio"
                            value={portfolioLink}
                            onChange={(e) => {
                              setPortfolioLink(e.target.value);
                              clearError("portfolio");
                            }}
                            placeholder="https://instagram.com/yourwork"
                            className={`form-input ${errors.portfolio ? "error" : ""}`}
                          />
                          <p className="text-xs text-seed-400 mt-1">Instagram, TikTok, or personal website with your work</p>
                          {errors.portfolio && <p className="error-message">{errors.portfolio}</p>}
                        </div>

                        <div
                          onClick={() => {
                            setIdVerificationConsent(!idVerificationConsent);
                            clearError("idVerification");
                          }}
                          className={`checkbox-card ${idVerificationConsent ? "selected" : ""} ${errors.idVerification ? "border-pomegranate-400" : ""}`}
                        >
                          <input type="checkbox" checked={idVerificationConsent} onChange={() => {}} />
                          <span className="checkbox-indicator">
                            {idVerificationConsent && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-seed-700">I consent to ID verification *</p>
                            <p className="text-xs text-seed-500">We'll verify your identity with a government-issued ID</p>
                          </div>
                        </div>
                        {errors.idVerification && <p className="error-message">{errors.idVerification}</p>}

                        <div
                          onClick={() => {
                            setBackgroundCheckConsent(!backgroundCheckConsent);
                            clearError("backgroundCheck");
                          }}
                          className={`checkbox-card ${backgroundCheckConsent ? "selected" : ""} ${errors.backgroundCheck ? "border-pomegranate-400" : ""}`}
                        >
                          <input type="checkbox" checked={backgroundCheckConsent} onChange={() => {}} />
                          <span className="checkbox-indicator">
                            {backgroundCheckConsent && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-seed-700">I consent to a background check *</p>
                            <p className="text-xs text-seed-500">Required for independent providers to ensure safety</p>
                          </div>
                        </div>
                        {errors.backgroundCheck && <p className="error-message">{errors.backgroundCheck}</p>}
                      </div>
                    )}

                    {/* Services Offered (for both provider tiers) */}
                    {providerTier && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-seed-700 mb-3">
                            What services do you offer? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {SERVICES.map((service) => (
                              <div
                                key={service.id}
                                onClick={() => toggleService(service.id, "offered")}
                                className={`checkbox-card ${servicesOffered.includes(service.id) ? "selected" : ""}`}
                              >
                                <input type="checkbox" checked={servicesOffered.includes(service.id)} onChange={() => {}} />
                                <span className="checkbox-indicator">
                                  {servicesOffered.includes(service.id) && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </span>
                                <span className="text-xl">{service.emoji}</span>
                                <span className="text-sm font-medium text-seed-700">{service.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.services && <p className="error-message">{errors.services}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-seed-700 mb-3">
                            When are you available? *
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {AVAILABILITY_OPTIONS.map((option) => (
                              <div
                                key={option.id}
                                onClick={() => toggleAvailability(option.id)}
                                className={`checkbox-card ${availability.includes(option.id) ? "selected" : ""}`}
                              >
                                <input type="checkbox" checked={availability.includes(option.id)} onChange={() => {}} />
                                <span className="checkbox-indicator">
                                  {availability.includes(option.id) && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </span>
                                <span className="text-sm font-medium text-seed-700">{option.label}</span>
                              </div>
                            ))}
                          </div>
                          {errors.availability && <p className="error-message">{errors.availability}</p>}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || (userType === "provider" && !providerTier)}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      "Join the Waitlist"
                    )}
                  </button>
                </div>

                {/* Disclaimer */}
                <div className="pt-2 space-y-2">
                  <p className="text-xs text-seed-400 text-center leading-relaxed">
                    By joining the waitlist, you agree to receive UniGlow updates. UniGlow is a platform connecting students with independent providers and does not provide beauty services.
                  </p>
                  {userType === "provider" && (
                    <p className="text-xs text-seed-400 text-center leading-relaxed">
                      Providers are responsible for following applicable rules for their services.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center animate-fade-up stagger-3 opacity-0">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PomegranateLogo className="w-6 h-6" />
            <span className="font-display text-lg font-medium text-pomegranate-600">UniGlow</span>
          </div>
          <p className="text-seed-400 text-sm">
            © {new Date().getFullYear()} UniGlow. Built with 💜 for students.
          </p>
        </footer>
      </div>
    </main>
  );
}
