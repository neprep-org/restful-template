/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#63b3ed", // Light variant of the primary color
          DEFAULT: "#4299e1", // Default primary color
          dark: "#3182ce", // Dark variant of the primary color
        },
      },
    },
  },
  plugins: [],
};
