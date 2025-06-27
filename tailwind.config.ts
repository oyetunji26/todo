import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // or 'media' for automatic based on system
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        // Primary colors for a Web3 black-and-white accent
        black: "#0D0D0D",
        white: "#FDFDFD",
        gray: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Accent colors for highlights
        neon: {
          green: "#00FF85",
          blue: "#00CFFF",
          pink: "#FF00E5",
        },
      },
      backgroundImage: {
        // Subtle patterns and gradients
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-pattern":
          "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 255, 133, 0.5)", // Neon green glow
        subtle: "0 2px 10px rgba(0, 0, 0, 0.5)", // Subtle shadow
      },
      fontFamily: {
        sans: ["'Inter', sans-serif"], // A clean, modern font
        mono: ["'Space Mono', monospace"], // For Web3/tech accents
      },
      borderRadius: {
        xl: "1.25rem", // Large, rounded corners for modern design
      },
    },
  }
};

export default config;
