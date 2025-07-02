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
        // Fortune 500 Professional Color System
        primary: {
          50: '#f0f4f8',
          100: '#dae6f0',
          200: '#b4cce1',
          300: '#8fb3d3',
          400: '#6999c4',
          500: '#2B4C7E', // Deep navy blue - main primary
          600: '#243f6b',
          700: '#1d3258',
          800: '#162644',
          900: '#0f1931',
          950: '#080c1e',
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#2563EB', // Bright blue - CTAs, buttons
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        background: {
          DEFAULT: '#F4F6FA', // Soft gray - main background
          50: '#F4F6FA',
          100: '#e8ecf3',
          200: '#d1d9e7',
          300: '#bac6db',
          400: '#a3b3cf',
          500: '#8ca0c3',
          600: '#758db7',
          700: '#5e7aab',
          800: '#47679f',
          900: '#305493',
        },
        text: {
          DEFAULT: '#111827', // Dark gray/black - readability
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10B981', // Success/completion actions
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#EF4444', // Declines, cancellations
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        // Chat system colors
        chat: {
          own: '#2563EB', // User's messages
          other: '#FFFFFF', // Other person's messages
          background: '#F4F6FA',
          border: '#e2e8f0',
        },
        // Location/map colors
        location: {
          user: '#EF4444', // User location marker
          provider: '#10B981', // Provider location marker
          route: '#2563EB', // Route line
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-location': 'pulse-location 2s infinite',
        'typing': 'typing-bounce 1.4s infinite ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        'typing-bounce': {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-8px)' },
        },
        'pulse-location': {
          '0%': { 'box-shadow': '0 0 0 0 rgba(37, 99, 235, 0.7)' },
          '70%': { 'box-shadow': '0 0 0 10px rgba(37, 99, 235, 0)' },
          '100%': { 'box-shadow': '0 0 0 0 rgba(37, 99, 235, 0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
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
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}