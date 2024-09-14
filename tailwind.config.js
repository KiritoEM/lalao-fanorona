/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#e29c4d", foreground: "#a27035" },
      },
    },
  },
  plugins: [],
};
