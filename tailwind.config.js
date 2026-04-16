/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: '#121212',
        card: '#1E1E1E',
      },
    },
  },
  plugins: [],
};
