module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {"ZMG": ["Zen Maru Gothic", "serif"]}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}