import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniGlow | Student Beauty Marketplace Waitlist",
  description:
    "Join the waitlist for UniGlow - the student-to-student beauty platform connecting college students to trusted student providers for affordable services like hair, nails, lashes, and makeup.",
  keywords: [
    "student beauty",
    "college beauty services",
    "affordable hair",
    "student nails",
    "campus beauty",
    "student makeup artist",
  ],
  openGraph: {
    title: "UniGlow | Student Beauty Marketplace",
    description:
      "Connecting college students to trusted student beauty providers. Hair, nails, lashes, makeup - all on campus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
