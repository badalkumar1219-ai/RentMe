/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1ed',
          100: '#ffe0d6',
          200: '#ffc1ae',
          300: '#ff9b80',
          400: '#ff8065',
          500: '#f2644f',
          600: '#dd4d3d',
          700: '#b93b36',
          800: '#933532',
          900: '#74312f',
        },
        accent: {
          400: '#70d1c5',
          500: '#2fa99e',
          600: '#19877f',
        },
        surface: {
          600: '#536a6b',
          700: '#33494b',
          800: '#20383b',
          900: '#122629',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 6s ease infinite',
        'scale-in': 'scaleIn 0.5s ease-out both',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.08)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(242, 100, 79, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(242, 100, 79, 0.55)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
