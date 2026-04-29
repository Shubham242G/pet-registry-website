/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f88013',  // Use primary or primary-DEFAULT for bg-primary
          orange: '#f88013',
          light: '#ff9a44',
          dark: '#e06a0a',
          50: '#fff5ed',
          100: '#fde6d5',
          200: '#fbcdab',
          300: '#f8b481',
          400: '#f69a57',
          500: '#f88013',  // Your main color
          600: '#e06a0a',
          700: '#c45508',
          800: '#a84206',
          900: '#8c2f04',
        },
      },
      fontFamily: {
        archivo: ['var(--font-archivo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
