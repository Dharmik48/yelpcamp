/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      brand: '#00B25A',
      dark: '#222222',
      blue: '#4086F4',
      yellow: '#FFB60A',
      paragraph: '#666666',
      text: '#444444',
      primaryBg: '#FEFCFB',
      secondaryBg: '#F7F8FC',
    },
    fontFamily: {
      volkhov: ['Volkhov', 'Poppins', 'serif'],
      poppins: ['Volkhov', 'serif'],
    },
  },
  plugins: [],
}
