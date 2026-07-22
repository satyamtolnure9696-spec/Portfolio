import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05070D",
          soft: "#0A0E18",
          light: "#F6F7FB",
          "light-soft": "#ECEEF5",
        },
        signal: {
          cyan: "#5EEAD4",
          violet: "#A78BFA",
          amber: "#FBBF6B",
        },
        ink: {
          DEFAULT: "#E7ECF3",
          muted: "#7C879B",
          dim: "#4B5468",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(94,234,212,0.12), transparent 60%)",
        "aurora":
          "conic-gradient(from 180deg at 50% 50%, #5EEAD4, #A78BFA, #FBBF6B, #5EEAD4)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
