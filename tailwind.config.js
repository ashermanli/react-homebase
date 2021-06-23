
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode:'jit',
  purge: [
    './src/**/*.{js,jsx,tx,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'Orbitron': ['Orbitron', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
