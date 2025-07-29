/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bee-yellow': 'var(--color-bee-yellow)',
        'bee-black': 'var(--color-bee-black)',
        'bee-orange': '#FF5500',
        'bee-amber': '#FF9500',
        'bee-gold': '#FFB000',
        'bee-honey': '#FF8000',
      },
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
        },
      },
    },
  },
  plugins: [],
}