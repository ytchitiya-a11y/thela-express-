/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        tandoor: '#1F1815',    // charcoal black - hero/nav background
        paper: '#FBF3E7',      // warm kraft paper - page background
        saffron: '#E8A23D',    // marigold - primary CTA
        chili: '#C13B2C',      // chili red - secondary accent / spicy tags
        chutney: '#6B8E4E',    // mint chutney green - available/success
        ink: '#2B211C',        // dark brown text
        clay: '#8C5A3B',       // terracotta clay - borders/dividers
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleX(1)', opacity: '0.35' },
          '50%': { transform: 'translateY(-14px) scaleX(1.15)', opacity: '0.7' },
        },
        chitDrop: {
          '0%': { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        steam: 'steam 2.8s ease-in-out infinite',
        chitDrop: 'chitDrop 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
