import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glow: {
          50: "#FFF7F5",
          100: "#FFEDE8",
          200: "#FFD9CF",
          300: "#FFB8A6",
          400: "#FF9178",
          500: "#FF6B4A",
          600: "#E84D2A",
          700: "#C23A1C",
          800: "#9A3019",
          900: "#7A2B19",
        },
        coral: {
          50: "#FFF5F3",
          100: "#FFE8E3",
          200: "#FFD5CC",
          300: "#FFB3A3",
          400: "#FF8570",
          500: "#F75B47",
          600: "#E43D29",
          700: "#C02E1D",
          800: "#9E291C",
          900: "#83281D",
        },
        lavender: {
          50: "#F8F6FF",
          100: "#F0EBFF",
          200: "#E4DBFF",
          300: "#CFC0FF",
          400: "#B79BFF",
          500: "#9D70FF",
          600: "#8B4FFF",
          700: "#7A3AEB",
          800: "#6630C5",
          900: "#542AA0",
        },
        cream: "#FFFBF7",
        warmgray: {
          50: "#FAF9F7",
          100: "#F5F3F0",
          200: "#E8E4DF",
          300: "#D5CFC7",
          400: "#B8AFA3",
          500: "#9A9083",
          600: "#7D7368",
          700: "#665E54",
          800: "#554E46",
          900: "#49443D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 74, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 74, 0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
