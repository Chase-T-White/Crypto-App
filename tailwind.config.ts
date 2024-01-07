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
        400: "#1e1932",
        500: "#232336",
        600: "#191932",
        700: "#191925",
        800: "#13121a",
      },
      "purple-blue": "#5a5a89",
      "blueish-black": "#14142b",
      blue: "#023aff",
      birches: "#01f1e3",
      yellow: "#ffa63f",
      "electric-green": "#5eff5a",
      red: "#ff2d2e",
      purple: "#991bfa",
      black: "05050f",
      white: "#fff",
      "light-purple": "#f3f5f9",
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
  },
  plugins: [],
  darkMode: "class",
};
export default config;
