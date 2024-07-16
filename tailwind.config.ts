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
        300: "#1e1932",
        400: "#232336",
        500: "#353570",
        600: "#191932",
        700: "#191925",
        800: "#1E1932",
        900: "#13121a",
      },
      "purple-blue": "#5a5a89",
      "blueish-black": "#14142b",
      blue: "#023aff",
      birches: {
        100: "#01f1e3",
        200: "#00B1A7",
      },
      yellow: "#ffa63f",
      "electric-green": "#5eff5a",
      red: "#FE2264",
      purple: "#991bfa",
      black: "#05050f",
      trueBlack: "#000",
      white: "#fff",
      "purple-medium": "#7878fa",
      "gradient-purple": "#7517f8",
      "gradient-pink": "#e323ff",
      "gradient-sky-blue": "#02a4ff",
      "gradient-purple2": "#7d40ff",
      "gradient-blue": "#4da1ff",
      "gradient-bright-lightgreen": "#4dffdf",
      "darkTheme-white": {
        100: "#fff",
        200: "#d1d1d1",
        500: "#a7a7cc",
      },
      "lightTheme-bg-purple": {
        100: "#f3f5f9",
        200: "#ccccfa66",
        300: "#6161d680",
      },
      "lightTheme-blue": {
        300: "#424286",
        500: "#232336",
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
