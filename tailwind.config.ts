// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ─── Font families ───────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        bebas:   ["Bebas Neue", "Impact", ...defaultTheme.fontFamily.sans],
        serif:   ["DM Serif Display", ...defaultTheme.fontFamily.serif],
      },

      // ─── Brand colors ────────────────────────────────────────────────────────
      colors: {
        brand: {
          DEFAULT: "#6366f1", // indigo-500
          dark:    "#4f46e5", // indigo-600
          light:   "#e0e7ff", // indigo-100
        },
        fire: {
          DEFAULT: "#ef4444", // red-500
          light:   "#fee2e2", // red-100
        },
      },

      // ─── Typography scale extras ─────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      // ─── Box shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        card:  "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 12px 40px -8px rgba(15, 23, 42, 0.16)",
      },

      // ─── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      // ─── Backdrop blur ────────────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ─── Animation / keyframes ────────────────────────────────────────────────
      // (actual keyframes live in globals.css; these expose Tailwind classes)
      animation: {
        "card-reveal":  "cardReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fire-pulse":   "firePulse 1.8s ease-in-out infinite",
        "play-pulse":   "playPulse 2s ease-in-out infinite",
        "ticker":       "ticker 28s linear infinite",
        "grad-shift":   "gradShift 10s ease infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
