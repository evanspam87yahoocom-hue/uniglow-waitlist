"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isBooker = type === "booker";
  const isProvider = type === "provider";

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-glow-200 -top-48 -left-48" />
        <div className="blob w-[500px] h-[500px] bg-lavender-200 top-1/4 -right-32" />
        <div className="blob w-[400px] h-[400px] bg-coral-200 bottom-0 left-1/4" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6 py-12 text-center">
        {/* Success animation */}
        <div className="mb-8 animate-scale-in">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-glow-400 to-coral-500 rounded-full flex items-center justify-center shadow-xl shadow-glow-300/40 animate-glow-pulse">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-up stagger-1 opacity-0">
          <h1 className="font-display text-4xl md:text-5xl text-warmgray-900 mb-4">
            You're on the list!
          </h1>

          {isBooker && (
            <div className="space-y-4">
              <p className="text-xl text-warmgray-600 leading-relaxed">
                Thanks for joining the{" "}
                <span className="font-semibold bg-gradient-to-r from-glow-600 to-coral-500 bg-clip-text text-transparent">
                  UniGlow
                </span>{" "}
                waitlist! 💜
              </p>
              <p className="text-warmgray-500 leading-relaxed">
                We're working hard to bring affordable, trusted beauty services
                to your campus. You'll be the first to know when we launch in
                your area. Get ready to discover amazing student beauty
                providers!
              </p>
              <div className="mt-6 p-4 bg-glow-50/80 rounded-2xl border border-glow-200">
                <p className="text-glow-700 text-sm font-medium">
                  💡 Pro tip: Tell your friends who do hair, nails, or makeup to
                  sign up as providers!
                </p>
              </div>
            </div>
          )}

          {isProvider && (
            <div className="space-y-4">
              <p className="text-xl text-warmgray-600 leading-relaxed">
                Thanks for joining{" "}
                <span className="font-semibold bg-gradient-to-r from-glow-600 to-coral-500 bg-clip-text text-transparent">
                  UniGlow
                </span>{" "}
                as a provider! 💅
              </p>
              <p className="text-warmgray-500 leading-relaxed">
                You're one step closer to building your beauty business on
                campus. We'll reach out soon with next steps to set up your
                profile and start connecting you with clients at your school.
              </p>
              <div className="mt-6 p-4 bg-lavender-50/80 rounded-2xl border border-lavender-200">
                <p className="text-lavender-700 text-sm font-medium">
                  ✨ Early providers get priority placement and featured spots
                  when we launch!
                </p>
              </div>
            </div>
          )}

          {!isBooker && !isProvider && (
            <div className="space-y-4">
              <p className="text-xl text-warmgray-600 leading-relaxed">
                Thanks for your interest in{" "}
                <span className="font-semibold bg-gradient-to-r from-glow-600 to-coral-500 bg-clip-text text-transparent">
                  UniGlow
                </span>
                !
              </p>
              <p className="text-warmgray-500 leading-relaxed">
                We'll be in touch soon with updates about our launch.
              </p>
            </div>
          )}
        </div>

        {/* Social share & back link */}
        <div className="mt-10 animate-fade-up stagger-2 opacity-0 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20UniGlow%20-%20a%20student-to-student%20beauty%20platform!%20%F0%9F%92%85%E2%9C%A8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-warmgray-900 text-white rounded-xl font-medium hover:bg-warmgray-800 transition-colors"
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
            className="inline-flex items-center gap-2 text-warmgray-500 hover:text-glow-600 transition-colors font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 animate-fade-up stagger-3 opacity-0">
          <p className="text-warmgray-400 text-sm">
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-glow-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
