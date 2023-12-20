/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': {
          90: '#343844',
          100: '#272B35',
          200: '#21242D',
          300: '#1C1E26',
          400: '#16181F',
          500: '#131519',
          600: '#0B0B0E',
          700: '#070708',
          800: '#151618',
          900: '#0E0E0F',
        },
        'blue': {
          400: '#0583DD',
          500: '#0177CC',
          600: '#016AB6',
        },
        'purps': {
          100: '#C9D1F7',
          200: '#B6BFEE',
        }
      }
    }
  },
  plugins: [],
}

