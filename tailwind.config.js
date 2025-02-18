const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#4CAF50",
        // "primary-dark": "#388E3C",
        primary: "#2c354d",
        secondary: "#b3d5e3",
        button: "#334854",
        hoverColor: "#896399",
      },
    },
  },
  plugins: [require("daisyui")],
});
