// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
    import('@tailwindcss/forms'),
    import('@tailwindcss/aspect-ratio'),
    import('@tailwindcss/container-queries'),
  ],
};
