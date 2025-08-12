/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: [
    "./src//*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dark: 'dark',
      light: 'light',
    },
  },
  plugins: [],
}