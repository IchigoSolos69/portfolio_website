/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spiritual-energy': '#ff6b35',
        'soul-society': '#1e3a8a',
        'reiatsu-glow': '#fbbf24',
        'hollow-mask': '#2d1b69',
        'zanpakuto-steel': '#e2e8f0',
        'flash-step': '#60a5fa',
        'kido-purple': '#8b5cf6',
      },
      animation: {
        'spiritual-pulse': 'spiritual-pulse 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'sword-slash': 'sword-slash 0.8s ease-out',
        'flash-step': 'flash-step 0.3s ease-out',
        'reiatsu-glow': 'reiatsu-glow 3s ease-in-out infinite',
        'floating': 'floating 3s ease-in-out infinite',
        'energy-wave': 'energy-wave 2s ease-in-out infinite',
        'bankai-release': 'bankai-release 1.5s ease-out forwards',
        'hollow-mask-appear': 'hollow-mask-appear 1s ease-out forwards',
        'zanpakuto-shine': 'zanpakuto-shine 2s ease-in-out infinite',
      },
      keyframes: {
        'spiritual-pulse': {
          '0%, 100%': { 
            opacity: '0.6', 
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '50%': { 
            opacity: '1', 
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)',
          },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'sword-slash': {
          '0%': {
            transform: 'translateX(-100%) rotate(-45deg)',
            opacity: '0',
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': {
            transform: 'translateX(100%) rotate(-45deg)',
            opacity: '0',
          },
        },
        'flash-step': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0',
            filter: 'brightness(2)',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.8',
            filter: 'brightness(1.5)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
            filter: 'brightness(1)',
          },
        },
        'reiatsu-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(251, 191, 36, 0.4)',
          },
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'energy-wave': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'bankai-release': {
          '0%': {
            transform: 'scale(0.5) rotate(0deg)',
            opacity: '0',
            filter: 'brightness(3)',
          },
          '50%': {
            transform: 'scale(1.2) rotate(180deg)',
            opacity: '0.8',
            filter: 'brightness(2)',
          },
          '100%': {
            transform: 'scale(1) rotate(360deg)',
            opacity: '1',
            filter: 'brightness(1)',
          },
        },
        'hollow-mask-appear': {
          '0%': {
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            opacity: '0',
          },
          '50%': {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)',
            opacity: '0.7',
          },
          '100%': {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: '1',
          },
        },
        'zanpakuto-shine': {
          '0%, 100%': { transform: 'rotate(0deg)', filter: 'brightness(1)' },
          '25%': { transform: 'rotate(5deg)', filter: 'brightness(1.3)' },
          '75%': { transform: 'rotate(-5deg)', filter: 'brightness(1.3)' },
        },
      },
      backgroundImage: {
        'spiritual-gradient': 'linear-gradient(135deg, #ff6b35, #fbbf24)',
        'soul-society-gradient': 'linear-gradient(180deg, #1e3a8a, #111827)',
        'reiatsu-radial': 'radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent)',
      },
    },
  },
  plugins: [],
}
