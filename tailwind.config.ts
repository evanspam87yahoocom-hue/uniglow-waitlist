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
        // Pomegranate-inspired palette
        pomegranate: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#C41E3A", // Deep pomegranate red
          600: "#A31831",
          700: "#831328",
          800: "#6B1023",
          900: "#450A15",
          950: "#2D0610",
        },
        blush: {
          50: "#FFF8F6",
          100: "#FFF1ED",
          200: "#FFE4DC",
          300: "#FFD0C2",
          400: "#FFB5A0",
          500: "#FF9A7E",
          600: "#E87B5E",
          700: "#C45C42",
          800: "#9E4432",
          900: "#7A3528",
        },
        tan: {
          50: "#FDFBF7",
          100: "#FAF6EE",
          200: "#F5ECD9",
          300: "#EBDCBE",
          400: "#DEC89D",
          500: "#CEB07A",
          600: "#B8965B",
          700: "#967747",
          800: "#785F3B",
          900: "#5E4A30",
        },
        cream: {
          50: "#FFFDFB",
          100: "#FFF9F5",
          200: "#FFF5ED",
          300: "#FFEFE3",
          400: "#FFE8D6",
          DEFAULT: "#FFF9F5",
        },
        seed: {
          50: "#FBF7F4",
          100: "#F5EBE4",
          200: "#EBD7C9",
          300: "#DDBDA5",
          400: "#CB9B7A",
          500: "#B97D58",
          600: "#A46548",
          700: "#87503A",
          800: "#6E4133",
          900: "#5A362B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(196, 30, 58, 0.08), 0 4px 6px -4px rgba(196, 30, 58, 0.05)",
        "soft-lg": "0 10px 40px -10px rgba(196, 30, 58, 0.12), 0 4px 20px -8px rgba(196, 30, 58, 0.08)",
        "soft-xl": "0 20px 50px -15px rgba(196, 30, 58, 0.15), 0 8px 30px -12px rgba(196, 30, 58, 0.1)",
        glow: "0 0 30px rgba(196, 30, 58, 0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
