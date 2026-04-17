/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: '#121212',
        surface: '#1E1E1E',
        primary: '#007E7A',
        accent: '#F7B52D',
        appText: '#FFFFFF',
        muted: '#9CA3AF',
        line: '#2C2C2C',
        success: '#22C55E',
        warning: '#F7B52D',
        danger: '#EF4444',
        info: '#4E88FF',
      },
      boxShadow: {
        panel: '0 8px 24px rgba(0,0,0,0.25)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
