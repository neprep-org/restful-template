/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#77DD77", // Light variant of the primary color
          DEFAULT: "#5ACE5A", // Default primary color
          dark: "#34B335", // Dark variant of the primary color
        },
      },
    },
  },
  plugins: [],
};
