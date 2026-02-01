"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

// Pomegranate Logo Component
function PomegranateLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 4C14 4 8 14 8 24C8 34 14 44 24 44C34 44 40 34 40 24C40 14 34 4 24 4Z"
        fill="url(#pomGradient)"
      />
      <path
        d="M24 4C24 4 22 2 20 2C18 2 17 3 17 4C17 5 18 6 20 6C21 6 22 5 22 5L24 4L26 5C26 5 27 6 28 6C30 6 31 5 31 4C31 3 30 2 28 2C26 2 24 4 24 4Z"
        fill="#6B1023"
      />
      <circle cx="18" cy="20" r="3" fill="#FEE2E2" fillOpacity="0.8" />
      <circle cx="24" cy="16" r="2.5" fill="#FEE2E2" fillOpacity="0.7" />
      <circle cx="30" cy="20" r="3" fill="#FEE2E2" fillOpacity="0.8" />
      <circle cx="16" cy="28" r="2.5" fill="#FEE2E2" fillOpacity="0.6" />
      <circle cx="24" cy="26" r="3.5" fill="#FEE2E2" fillOpacity="0.9" />
      <circle cx="32" cy="28" r="2.5" fill="#FEE2E2" fillOpacity="0.6" />
      <circle cx="20" cy="34" r="2" fill="#FEE2E2" fillOpacity="0.5" />
      <circle cx="28" cy="34" r="2" fill="#FEE2E2" fillOpacity="0.5" />
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

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const tier = searchParams.get("tier");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isBooker = type === "booker";
  const isProvider = type === "provider";
  const isBeautySchool = tier === "beauty-school";
  const isIndependent = tier === "independent";

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="pomegranate-blob w-[700px] h-[700px] bg-blush-200/50 -top-64 -left-64 animate-pulse" />
        <div className="pomegranate-blob w-[500px] h-[500px] bg-pomegranate-200/30 top-1/3 -right-48 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="pomegranate-blob w-[400px] h-[400px] bg-tan-200/40 bottom-0 left-1/4 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-12 text-center">
        {/* Success Icon */}
        <div className="mb-8 animate-scale-in">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pomegranate-400 to-pomegranate-600 rounded-full flex items-center justify-center shadow-soft-xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-up stagger-1 opacity-0">
          <h1 className="font-display text-4xl md:text-5xl text-pomegranate-900 mb-4">
            You're on the list!
          </h1>

          {/* Booker Message */}
          {isBooker && (
            <div className="space-y-4">
              <p className="text-xl text-seed-600 leading-relaxed">
                Thanks for joining{" "}
                <span className="font-semibold text-pomegranate-600">UniGlow</span>! 💜
              </p>
              <p className="text-seed-500 leading-relaxed">
                We're building a community of talented student beauty providers just for you.
                You'll be the first to know when we launch at your school!
              </p>
              <div className="mt-6 p-5 bg-gradient-to-br from-blush-50 to-tan-50 rounded-2xl border border-blush-200">
                <p className="text-seed-700 text-sm font-medium">
                  💡 Know a friend who does amazing hair, nails, or makeup? Tell them to sign up as a provider!
                </p>
              </div>
            </div>
          )}

          {/* Provider - Beauty School Message */}
          {isProvider && isBeautySchool && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blush-100 to-tan-100 rounded-full border border-blush-200 mb-2">
                <svg className="w-4 h-4 text-seed-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-sm font-medium text-seed-700">Beauty School Student Provider</span>
              </div>
              <p className="text-xl text-seed-600 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-pomegranate-600">UniGlow</span>! 💅
              </p>
              <p className="text-seed-500 leading-relaxed">
                Your beauty school journey is about to get even more exciting. Practice your skills, 
                build your client base, and earn while you learn.
              </p>
              <div className="mt-6 p-5 bg-gradient-to-br from-blush-50 to-tan-50 rounded-2xl border border-blush-200 text-left">
                <p className="font-semibold text-seed-700 mb-2">Next steps:</p>
                <ul className="text-seed-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blush-500 mt-0.5">✓</span>
                    We'll reach out to verify your beauty school enrollment
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blush-500 mt-0.5">✓</span>
                    Set up your profile showcasing your specialties
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blush-500 mt-0.5">✓</span>
                    Start connecting with clients on campus!
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Provider - Independent Message */}
          {isProvider && isIndependent && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pomegranate-100 to-blush-100 rounded-full border border-pomegranate-200 mb-2">
                <svg className="w-4 h-4 text-pomegranate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm font-medium text-pomegranate-700">Independent Provider</span>
              </div>
              <p className="text-xl text-seed-600 leading-relaxed">
                Welcome to{" "}
                <span className="font-semibold text-pomegranate-600">UniGlow</span>! ✨
              </p>
              <p className="text-seed-500 leading-relaxed">
                You're one step closer to growing your beauty business on campus.
                Your skills deserve to be seen!
              </p>
              <div className="mt-6 p-5 bg-gradient-to-br from-pomegranate-50 to-blush-50 rounded-2xl border border-pomegranate-200 text-left">
                <p className="font-semibold text-pomegranate-700 mb-2">Verification process:</p>
                <ul className="text-pomegranate-600 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-pomegranate-400 mt-0.5">1.</span>
                    We'll review your portfolio submission
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pomegranate-400 mt-0.5">2.</span>
                    Complete ID verification (quick & secure)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pomegranate-400 mt-0.5">3.</span>
                    Background check processing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pomegranate-400 mt-0.5">4.</span>
                    Get your verified badge and start booking!
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Generic fallback */}
          {!isBooker && !isProvider && (
            <div className="space-y-4">
              <p className="text-xl text-seed-600 leading-relaxed">
                Thanks for your interest in{" "}
                <span className="font-semibold text-pomegranate-600">UniGlow</span>!
              </p>
              <p className="text-seed-500 leading-relaxed">
                We'll be in touch soon with updates.
              </p>
            </div>
          )}
        </div>

        {/* Social Share */}
        <div className="mt-10 animate-fade-up stagger-2 opacity-0 space-y-6">
          <p className="text-seed-500 text-sm">Spread the word!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20UniGlow%20waitlist%20-%20a%20student-to-student%20beauty%20platform!%20%F0%9F%92%85%E2%9C%A8%20Beauty%20by%20students%2C%20for%20students."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-seed-900 text-white rounded-xl font-medium hover:bg-seed-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow on Instagram
            </a>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-seed-500 hover:text-pomegranate-600 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 animate-fade-up stagger-3 opacity-0">
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

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-spin w-8 h-8 border-4 border-pomegranate-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
