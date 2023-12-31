const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Add the paths to your source files
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add more paths as needed
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors here if needed
      },
      // Any other theme customizations
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'), // Add this line if you want to use the Tailwind CSS Forms plugin
  ],
  daisyui: {
    themes: [
      "dark", // Your current theme
      // You can add more DaisyUI themes here if you wish
    ],
  },
}
