/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'marquee': 'marquee var(--duration, 30s) linear infinite',
      },
      keyframes: {
        marquee: {
          'to': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(50%)' },
        },
      },
    },
  },
  plugins: [],
}
