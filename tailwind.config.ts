// tailwind.config.ts
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        bebas: ["Bebas Neue", "Impact", ...defaultTheme.fontFamily.sans],
        serif: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          dark:    "#4f46e5",
          light:   "#e0e7ff",
        },
        fire: {
          DEFAULT: "#ef4444",
          light:   "#fee2e2",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card:       "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 12px 40px -8px rgba(15, 23, 42, 0.16)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "card-reveal": "cardReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fire-pulse":  "firePulse 1.8s ease-in-out infinite",
        "play-pulse":  "playPulse 2s ease-in-out infinite",
        "ticker":      "ticker 28s linear infinite",
        "grad-shift":  "gradShift 10s ease infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};

export default config;
