/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        themeLightGrey: "#F6F4F8",
        themePurple: "#4B0097",
        themeDarkGrey: "#E6E0EB",
        themeBlack: "#444444",
      },
    },
  },
  plugins: [],
};
