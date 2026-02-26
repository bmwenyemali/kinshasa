/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(0, 119, 190)",
          dark: "rgb(0, 90, 158)",
          light: "rgb(82, 182, 233)",
        },
        secondary: {
          DEFAULT: "rgb(253, 185, 19)",
        },
        accent: {
          DEFAULT: "rgb(206, 17, 38)",
        },
        background: "rgb(245, 247, 250)",
        foreground: "rgb(26, 43, 60)",
        surface: "rgb(255, 255, 255)",
        muted: {
          DEFAULT: "rgb(241, 243, 245)",
          foreground: "rgb(84, 110, 122)",
        },
        border: "rgb(224, 231, 239)",
        success: "rgb(46, 125, 50)",
        warning: "rgb(237, 108, 2)",
        error: "rgb(211, 47, 47)",
        info: "rgb(2, 136, 209)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
