import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UniGlow | Beauty by Students, for Students",
  description:
    "Join the UniGlow waitlist - the student-to-student beauty platform connecting college students with trusted student providers for affordable beauty services.",
  keywords: [
    "student beauty",
    "college beauty services",
    "affordable hair",
    "student providers",
    "campus beauty",
    "student makeup",
    "student nails",
  ],
  openGraph: {
    title: "UniGlow | Beauty by Students, for Students",
    description:
      "Connecting college students with trusted student beauty providers. Hair, nails, lashes, makeup - all on campus.",
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
