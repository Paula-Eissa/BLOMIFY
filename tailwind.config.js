/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["cupcake", "dark", "cmyk", "cyberpunk","light"],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      "dark-brownish": "#6C5A4B",
      "deep-burgundy": "#4C1B1B",
      "dusty-mauve": "#AE6B77",
      "light-pink": "#F3C0C7",
      "pale-grayish": "#E8E1DA",
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
