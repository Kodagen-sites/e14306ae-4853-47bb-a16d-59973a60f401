import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0a",
          soft: "#1a1a1a",
          body: "#4a4a4a",
          eyebrow: "#6b6b6b",
          muted: "#8a8a8a",
        },
        canvas: {
          DEFAULT: "#ffffff",
          tint: "#f7f7f5",
          stone: "#ececea",
          mist: "#e4e4e1",
        },
        accent: {
          DEFAULT: "#0a0a0a",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tightsr: "-0.02em",
      },
      animation: {
        "grid-pulse": "grid-pulse 8s ease-in-out infinite",
      },
      keyframes: {
        "grid-pulse": {
          "0%, 100%": { opacity: "0.06" },
          "50%": { opacity: "0.12" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
