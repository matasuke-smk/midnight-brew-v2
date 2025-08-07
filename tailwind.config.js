/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': {
          50: '#f5f5f5',
          100: '#a0a0a0',
          900: '#0a0a0a',
          800: '#0d0d0d',
        },
        'gold': {
          500: '#c9a961',
        },
        'coffee': {
          500: '#8b4513',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}