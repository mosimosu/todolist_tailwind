/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: { lg: "960px" },
      colors: { main: { 500: "#FFD370" }, warning: { 500: "#D87355" } },
      fontFamily: { NotoSansTC: ["Noto Sans TC", "sans-serif"] },
      backgroundImage: {
        "gradient-to-175": "linear-gradient(175deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
