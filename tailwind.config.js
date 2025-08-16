/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spiritual-energy': '#ffffff',
        'soul-society': '#262626',
        'reiatsu-glow': '#d4d4d4',
        'hollow-mask': '#404040',
        'zanpakuto-steel': '#e5e5e5',
        'flash-step': '#f5f5f5',
        'kido-purple': '#a3a3a3',
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
        // New Animations
        'typewriter': 'typewriter 2s steps(32) 1s 1 normal both',
        'scene-fade': 'scene-fade 1s ease-in-out forwards',
        'panel-slide-right': 'panel-slide-right 0.7s cubic-bezier(.6,.04,.98,.335) forwards',
        'panel-slide-left': 'panel-slide-left 0.7s cubic-bezier(.6,.04,.98,.335) forwards',
        'anime-eye-flash': 'anime-eye-flash 0.7s cubic-bezier(.9,.01,.97,.1) forwards',
        'reiatsu-pulse': 'reiatsu-pulse 1.5s ease-in-out infinite',
        'katana-sparkle': 'katana-sparkle 1.2s ease-out',
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
          '0%': { transform: 'translateX(-100%) rotate(-45deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)', opacity: '0' },
        },
        'flash-step': {
          '0%': { transform: 'scale(0.8)', opacity: '0', filter: 'brightness(2)' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1)', opacity: '1', filter: 'brightness(1)' },
        },
        'reiatsu-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(212,212,212,0.4)' },
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
          '0%': { transform: 'scale(0.5) rotate(0deg)', opacity: '0', filter: 'brightness(3)' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8', filter: 'brightness(2)' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1', filter: 'brightness(1)' },
        },
        'hollow-mask-appear': {
          '0%': { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', opacity: '0' },
          '50%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%)', opacity: '0.7' },
          '100%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', opacity: '1' },
        },
        'zanpakuto-shine': {
          '0%, 100%': { transform: 'rotate(0deg)', filter: 'brightness(1)' },
          '25%': { transform: 'rotate(5deg)', filter: 'brightness(1.3)' },
          '75%': { transform: 'rotate(-5deg)', filter: 'brightness(1.3)' },
        },
        // New Keyframes
        'typewriter': {
          '0%': { width: '0ch' },
          '100%': { width: '32ch' }
        },
        'scene-fade': {
          '0%': { opacity: '0.2', filter: 'blur(12px)' },
          '60%': { opacity: '0.7', filter: 'blur(2px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        'panel-slide-right': {
          'from': { transform: 'translateX(-50vw) scale(0.9)', opacity: '0' },
          'to': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        'panel-slide-left': {
          'from': { transform: 'translateX(50vw) scale(0.9)', opacity: '0' },
          'to': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
        'anime-eye-flash': {
          '0%': { boxShadow: '0 0 0px 0px #fff', filter: 'contrast(1.6)' },
          '50%': { boxShadow: '0 0 40px 10px #fff', filter: 'contrast(2.3)' },
          '100%': { boxShadow: '0 0 0px 0px #fff', filter: 'contrast(1)' },
        },
        'reiatsu-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px 2px #fff', filter: 'brightness(1)' },
          '40%': { boxShadow: '0 0 30px 15px #d4d4d4', filter: 'brightness(1.3)' },
          '70%': { boxShadow: '0 0 40px 25px #a3a3a3', filter: 'brightness(1.1)' },
        },
        'katana-sparkle': {
          '0%': { opacity: '0', transform: 'translateY(-30px) scaleX(1.3)' },
          '60%': { opacity: '0.7', transform: 'translateY(10px) scaleX(0.9)' },
          '100%': { opacity: '1', transform: 'translateY(0) scaleX(1)' },
        },
      },
      backgroundImage: {
        'spiritual-gradient': 'linear-gradient(135deg, #ffffff, #d4d4d4)',
        'soul-society-gradient': 'linear-gradient(180deg, #262626, #111111)',
        'reiatsu-radial': 'radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent)',
      },
    },
  },
  plugins: [],
}
