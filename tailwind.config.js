export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        hand: ['Caveat', 'cursive'],
        script: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: { blush: '#ffc8dd', rose: '#ff8fb8', lav: '#cdb4ff', sky: '#a2d2ff', ink: '#6b3a55' },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) rotate(0)', opacity: '0' },
          '10%': { opacity: '.75' },
          '100%': { transform: 'translateY(-115vh) rotate(40deg)', opacity: '0' },
        },
        flicker: { '0%,100%': { transform: 'scale(1) rotate(-2deg)' }, '50%': { transform: 'scale(1.12,.94) rotate(2deg)' } },
      },
      animation: { floatUp: 'floatUp linear infinite', flicker: 'flicker .6s ease-in-out infinite' },
    },
  },
  plugins: [],
};
