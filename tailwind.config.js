/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        app: '#0B0F10',
        surface: '#151C1E',
        primary: '#007E7A',
        accent: '#EDB111',
        vale: {
          green: '#007E7A',
          gold: '#EDB111',
          gray: {
            dark: '#555555',
            mid: '#747678',
          }
        },
        appText: '#E5E7EB',
        muted: '#9CA3AF',
        line: '#242D30',
        success: '#10B981',
        warning: '#EDB111',
        danger: '#EF4444',
        info: '#3B82F6',
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
