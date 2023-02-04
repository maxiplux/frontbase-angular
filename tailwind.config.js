/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',    ]
  },
  darkMode: 'media', // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }

    }
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require("daisyui")],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "default",
  },
}
