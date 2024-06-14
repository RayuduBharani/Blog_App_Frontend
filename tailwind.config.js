/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '520px',
      md: '796px',
      lg: '996px',
      xl: '1240px',
      xxl: '1440px'
    }
  },
  plugins: [
    require('daisyui'),
  ],
}