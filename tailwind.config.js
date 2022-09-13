/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        "main-bg-color": "#16151A",
      },
    },
    gradientColorStops: (theme) => ({
      ...theme("colors"),

      primary: "#16151A 0%",

      secondary: "#16151A 30%",

      danger: "transparent 100%",
    }),
  },
};
