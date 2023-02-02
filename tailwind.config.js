const defaultTheme = require('tailwindcss/defaultTheme')
const FormKitVariants = require('@formkit/themes/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    './src/**/*.{html,js,vue}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '3.5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          light: '#d9e9c7',
          DEFAULT: '#87b23f',
          dark: '#4c7a1f',
        },
      },
      fontFamily: {
        sans: ['PT Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [FormKitVariants],
}
