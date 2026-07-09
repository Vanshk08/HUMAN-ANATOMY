/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#f5f7fa',
          100: '#e4e8ee',
          200: '#c5cedb',
          500: '#0066cc', // Premium clinical blue
          600: '#0052a3',
          900: '#0b0f19',
        },
        dark: {
          bg: '#0a0a0c',
          panel: '#121216',
          border: '#22222a',
          text: '#f3f4f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
