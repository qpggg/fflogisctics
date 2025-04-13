/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63A00',
        'primary-hover': '#CC3300',
        'primary-light': 'rgba(230, 58, 0, 0.05)',
        'text-primary': '#1A1A1A',
        'text-secondary': '#4A5568',
        border: '#E2E8F0',
        background: '#FFFFFF',
        'background-alt': '#F8FAFC',
        'glass-background': 'rgba(255, 255, 255, 0.8)',
        'glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'truck-entrance': 'truckEntrance 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        truckEntrance: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(25%) scale(2)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0) scale(2)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'open-sans': ['Open Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
} 