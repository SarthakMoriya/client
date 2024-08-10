/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto"]
        // You can add more font families here if needed
      },
      colors: {
        primary: "#1f1f35",
        secondary: "#ffb606",
        blue: "#002147",
        background:"#f9f9f9"
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
