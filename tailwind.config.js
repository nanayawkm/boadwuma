/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          50: '#fef7ee',
          100: '#fdedd3',
          500: '#f97316',
          600: '#ea580c',
        },
        whatsapp: {
          light: '#e5ddd5',
          green: {
            50: '#dcfce7',
            100: '#bbf7d0',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
          },
          gray: {
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
          }
        }
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-green': 'pulse-green 2s infinite',
        'typing': 'typing-bounce 1.4s infinite ease-in-out',
      },
      keyframes: {
        'typing-bounce': {
          '0%, 60%, 100%': {
            transform: 'translateY(0)',
          },
          '30%': {
            transform: 'translateY(-8px)',
          },
        },
        'pulse-green': {
          '0%': {
            'box-shadow': '0 0 0 0 rgba(34, 197, 94, 0.7)',
          },
          '70%': {
            'box-shadow': '0 0 0 10px rgba(34, 197, 94, 0)',
          },
          '100%': {
            'box-shadow': '0 0 0 0 rgba(34, 197, 94, 0)',
          },
        },
      },
      borderRadius: {
        'bubble': '1.125rem',
      },
      maxWidth: {
        'message': '75%',
        'message-lg': '65%',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}