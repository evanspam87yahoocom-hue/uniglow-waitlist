"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserType = "booker" | "provider" | null;

interface FormErrors {
  email?: string;
  school?: string;
  services?: string;
  budget?: string;
  frequency?: string;
  timeline?: string;
  experience?: string;
  availability?: string;
  backgroundCheck?: string;
  startDate?: string;
}

const SERVICES = [
  { id: "hair", label: "Hair Styling & Braiding", emoji: "💇‍♀️" },
  { id: "nails", label: "Nails & Manicures", emoji: "💅" },
  { id: "lashes", label: "Lashes & Brows", emoji: "👁️" },
  { id: "makeup", label: "Makeup & Glam", emoji: "💄" },
  { id: "skincare", label: "Skincare & Facials", emoji: "✨" },
  { id: "waxing", label: "Waxing & Hair Removal", emoji: "🌸" },
];

const BUDGET_OPTIONS = [
  { id: "under25", label: "Under $25" },
  { id: "25to50", label: "$25 - $50" },
  { id: "50to100", label: "$50 - $100" },
  { id: "over100", label: "$100+" },
];

const FREQUENCY_OPTIONS = [
  { id: "weekly", label: "Weekly" },
  { id: "2to3monthly", label: "2-3x per month" },
  { id: "monthly", label: "Once a month" },
  { id: "occasionally", label: "Occasionally" },
];

const TIMELINE_OPTIONS = [
  { id: "asap", label: "ASAP - I need this now! 🔥" },
  { id: "semester", label: "This semester" },
  { id: "nextsemester", label: "Next semester" },
  { id: "justcurious", label: "Just curious for now" },
];

const EXPERIENCE_OPTIONS = [
  { id: "beginner", label: "Beginner - Just starting out" },
  { id: "intermediate", label: "Intermediate - Some experience" },
  { id: "advanced", label: "Advanced - Very experienced" },
  { id: "licensed", label: "Licensed Professional" },
];

const AVAILABILITY_OPTIONS = [
  { id: "weekday_morning", label: "Weekday Mornings" },
  { id: "weekday_afternoon", label: "Weekday Afternoons" },
  { id: "weekday_evening", label: "Weekday Evenings" },
  { id: "weekend_morning", label: "Weekend Mornings" },
  { id: "weekend_afternoon", label: "Weekend Afternoons" },
  { id: "weekend_evening", label: "Weekend Evenings" },
];

const START_OPTIONS = [
  { id: "asap", label: "ASAP - Ready to go! 🚀" },
  { id: "2weeks", label: "Within 2 weeks" },
  { id: "month", label: "Within a month" },
  { id: "exploring", label: "Just exploring" },
];

export default function WaitlistPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Common fields
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");

  // Booker fields
  const [servicesWanted, setServicesWanted] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [frequency, setFrequency] = useState("");
  const [timeline, setTimeline] = useState("");

  // Provider fields
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [backgroundCheck, setBackgroundCheck] = useState<string>("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!school.trim()) {
      newErrors.school = "School name is required";
    }

    if (userType === "booker") {
      if (servicesWanted.length === 0) {
        newErrors.services = "Please select at least one service";
      }
      if (!budget) {
        newErrors.budget = "Please select a budget range";
      }
      if (!frequency) {
        newErrors.frequency = "Please select how often you'd book";
      }
      if (!timeline) {
        newErrors.timeline = "Please let us know when you want UniGlow";
      }
    }

    if (userType === "provider") {
      if (servicesOffered.length === 0) {
        newErrors.services = "Please select at least one service you offer";
      }
      if (!experience) {
        newErrors.experience = "Please select your experience level";
      }
      if (availability.length === 0) {
        newErrors.availability = "Please select your availability";
      }
      if (!backgroundCheck) {
        newErrors.backgroundCheck =
          "Please indicate background check willingness";
      }
      if (!startDate) {
        newErrors.startDate = "Please let us know when you can start";
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

    const payload =
      userType === "booker"
        ? {
            type: "booker",
            email,
            school,
            services_wanted: servicesWanted,
            budget,
            frequency,
            timeline,
          }
        : {
            type: "provider",
            email,
            school,
            services_offered: servicesOffered,
            experience,
            portfolio_link: portfolioLink || null,
            availability,
            background_check: backgroundCheck,
            start_date: startDate,
          };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push(`/thanks?type=${userType}`);
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

  const toggleService = (
    serviceId: string,
    type: "wanted" | "offered"
  ) => {
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
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
    if (errors.availability) {
      setErrors((prev) => ({ ...prev, availability: undefined }));
    }
  };

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-glow-200 -top-48 -left-48" />
        <div className="blob w-[500px] h-[500px] bg-lavender-200 top-1/4 -right-32" />
        <div className="blob w-[400px] h-[400px] bg-coral-200 bottom-0 left-1/4" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <header className="text-center mb-12 animate-fade-up">
          <h1 className="font-display text-5xl md:text-6xl text-warmgray-900 mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-glow-600 via-coral-500 to-lavender-500 bg-clip-text text-transparent">
              UniGlow
            </span>
          </h1>
          <p className="font-display text-xl md:text-2xl text-warmgray-600 italic mb-6">
            Beauty by students, for students.
          </p>
          <p className="text-warmgray-600 text-lg leading-relaxed max-w-xl mx-auto">
            UniGlow is a student-to-student beauty platform connecting college
            students to trusted student providers for affordable services like
            hair, nails, lashes, and makeup.{" "}
            <span className="font-semibold text-glow-600">
              Built for campus communities.
            </span>
          </p>
        </header>

        {/* Form Section */}
        <section className="animate-fade-up stagger-2 opacity-0">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl shadow-warmgray-200/30 border border-white/50">
            <h2 className="font-display text-2xl md:text-3xl text-warmgray-800 text-center mb-8">
              Join the Waitlist
            </h2>

            {/* User Type Selection */}
            <div className="mb-8">
              <p className="text-warmgray-700 font-medium text-center mb-4">
                I am a...
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("booker");
                    setErrors({});
                  }}
                  className={`type-button group ${
                    userType === "booker" ? "selected" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      💆‍♀️
                    </span>
                    <div className="text-left">
                      <p className="font-semibold text-warmgray-800">
                        Student looking to book
                      </p>
                      <p className="text-sm text-warmgray-500">
                        Find beauty services on campus
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserType("provider");
                    setErrors({});
                  }}
                  className={`type-button group ${
                    userType === "provider" ? "selected" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      💅
                    </span>
                    <div className="text-left">
                      <p className="font-semibold text-warmgray-800">
                        Student provider
                      </p>
                      <p className="text-sm text-warmgray-500">
                        Offer your beauty services
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Dynamic Form Fields */}
            {userType && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                {/* Common Fields */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-warmgray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="your.email@university.edu"
                      className={`form-input ${
                        errors.email ? "border-coral-400" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="error-message">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-medium text-warmgray-700 mb-2"
                    >
                      School / University *
                    </label>
                    <input
                      type="text"
                      id="school"
                      value={school}
                      onChange={(e) => {
                        setSchool(e.target.value);
                        if (errors.school)
                          setErrors((prev) => ({ ...prev, school: undefined }));
                      }}
                      placeholder="e.g., University of San Diego"
                      className={`form-input ${
                        errors.school ? "border-coral-400" : ""
                      }`}
                    />
                    {errors.school && (
                      <p className="error-message">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.school}
                      </p>
                    )}
                  </div>
                </div>

                {/* Booker-specific fields */}
                {userType === "booker" && (
                  <div className="space-y-6 pt-2">
                    {/* Services Wanted */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        What services are you looking for? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service.id, "wanted")}
                            className={`checkbox-item ${
                              servicesWanted.includes(service.id)
                                ? "selected"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={servicesWanted.includes(service.id)}
                              onChange={() => {}}
                            />
                            <span className="checkbox-indicator">
                              {servicesWanted.includes(service.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-lg">{service.emoji}</span>
                            <span className="text-sm font-medium text-warmgray-700">
                              {service.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.services}
                        </p>
                      )}
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        What's your typical budget per service? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {BUDGET_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setBudget(option.id);
                              if (errors.budget)
                                setErrors((prev) => ({
                                  ...prev,
                                  budget: undefined,
                                }));
                            }}
                            className={`radio-item ${
                              budget === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={option.id}
                              checked={budget === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.budget && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.budget}
                        </p>
                      )}
                    </div>

                    {/* Frequency */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        How often would you book beauty services? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {FREQUENCY_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setFrequency(option.id);
                              if (errors.frequency)
                                setErrors((prev) => ({
                                  ...prev,
                                  frequency: undefined,
                                }));
                            }}
                            className={`radio-item ${
                              frequency === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="frequency"
                              value={option.id}
                              checked={frequency === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.frequency && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.frequency}
                        </p>
                      )}
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        When do you want UniGlow on your campus? *
                      </label>
                      <div className="space-y-2">
                        {TIMELINE_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setTimeline(option.id);
                              if (errors.timeline)
                                setErrors((prev) => ({
                                  ...prev,
                                  timeline: undefined,
                                }));
                            }}
                            className={`radio-item ${
                              timeline === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeline"
                              value={option.id}
                              checked={timeline === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.timeline && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.timeline}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Provider-specific fields */}
                {userType === "provider" && (
                  <div className="space-y-6 pt-2">
                    {/* Services Offered */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        What services do you offer? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {SERVICES.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service.id, "offered")}
                            className={`checkbox-item ${
                              servicesOffered.includes(service.id)
                                ? "selected"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={servicesOffered.includes(service.id)}
                              onChange={() => {}}
                            />
                            <span className="checkbox-indicator">
                              {servicesOffered.includes(service.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-lg">{service.emoji}</span>
                            <span className="text-sm font-medium text-warmgray-700">
                              {service.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.services}
                        </p>
                      )}
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        What's your experience level? *
                      </label>
                      <div className="space-y-2">
                        {EXPERIENCE_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setExperience(option.id);
                              if (errors.experience)
                                setErrors((prev) => ({
                                  ...prev,
                                  experience: undefined,
                                }));
                            }}
                            className={`radio-item ${
                              experience === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="experience"
                              value={option.id}
                              checked={experience === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.experience && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.experience}
                        </p>
                      )}
                    </div>

                    {/* Portfolio Link */}
                    <div>
                      <label
                        htmlFor="portfolio"
                        className="block text-sm font-medium text-warmgray-700 mb-2"
                      >
                        Portfolio or Instagram Link{" "}
                        <span className="text-warmgray-400">(optional)</span>
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        placeholder="https://instagram.com/yourwork"
                        className="form-input"
                      />
                      <p className="text-xs text-warmgray-500 mt-1.5">
                        Share your work to get priority access
                      </p>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        When are you typically available? *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {AVAILABILITY_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => toggleAvailability(option.id)}
                            className={`checkbox-item ${
                              availability.includes(option.id) ? "selected" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={availability.includes(option.id)}
                              onChange={() => {}}
                            />
                            <span className="checkbox-indicator">
                              {availability.includes(option.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.availability && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.availability}
                        </p>
                      )}
                    </div>

                    {/* Background Check */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        Are you willing to complete a background check? *
                      </label>
                      <div className="flex gap-4">
                        {[
                          { id: "yes", label: "Yes" },
                          { id: "no", label: "No" },
                          { id: "maybe", label: "Maybe" },
                        ].map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setBackgroundCheck(option.id);
                              if (errors.backgroundCheck)
                                setErrors((prev) => ({
                                  ...prev,
                                  backgroundCheck: undefined,
                                }));
                            }}
                            className={`radio-item flex-1 justify-center ${
                              backgroundCheck === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="backgroundCheck"
                              value={option.id}
                              checked={backgroundCheck === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.backgroundCheck && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.backgroundCheck}
                        </p>
                      )}
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-warmgray-700 mb-3">
                        When can you start taking clients? *
                      </label>
                      <div className="space-y-2">
                        {START_OPTIONS.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              setStartDate(option.id);
                              if (errors.startDate)
                                setErrors((prev) => ({
                                  ...prev,
                                  startDate: undefined,
                                }));
                            }}
                            className={`radio-item ${
                              startDate === option.id ? "selected" : ""
                            }`}
                          >
                            <input
                              type="radio"
                              name="startDate"
                              value={option.id}
                              checked={startDate === option.id}
                              onChange={() => {}}
                            />
                            <span className="radio-indicator" />
                            <span className="text-sm font-medium text-warmgray-700">
                              {option.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.startDate && (
                        <p className="error-message mt-2">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {errors.startDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <span>Join the Waitlist ✨</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Privacy Text */}
          <p className="text-center text-sm text-warmgray-500 mt-6 px-4">
            By joining, you agree to receive updates about UniGlow. We respect
            your privacy and will never share your information with third
            parties. You can unsubscribe at any time.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center animate-fade-up stagger-3 opacity-0">
          <p className="text-warmgray-400 text-sm">
            © {new Date().getFullYear()} UniGlow. Built with 💜 for students.
          </p>
        </footer>
      </div>
    </main>
  );
}
