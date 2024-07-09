import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      "dark-purple": {
        300: "#B374F2",
        400: "#9D62D9",
        500: "#232336",
        600: "#353570",
        700: "#191925",
        800: "#1E1932",
        900: "#13121a",
      },
      "light-purple": {
        100: "#F3F5F9",
        200: "#CCCCFA",
        300: "#6161D6",
      },
      "dark-blue": {
        300: "#7474F2",
        400: "#6161D6",
        700: "#191932",
      },
      birches: {
        100: "#01f1e3",
        200: "#00B1A7",
      },
      yellow: "#ffa63f",
      red: "#FE2264",
      black: "05050f",
      white: "#fff",
      "purple-text": {
        100: "#E4E4F0",
        200: "#A7A7CC",
      },
      "light-text": {
        100: "#fff",
        200: "#d1d1d1",
        300: "#B9B9BA",
      },
      "dark-text": {
        200: "#353570",
        400: "#424286",
        500: "#191932",
        600: "#181825",
      },
    },
    fontSize: {
      xsm: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "21px",
      "2xl": "24px",
      "3xl": "28px",
      "5xl": "36px",
    },
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans serif"],
      },
      screens: {
        xsm: "460px",
        base: "850px",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
