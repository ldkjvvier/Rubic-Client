/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#0e0f12',
        secondary: '#1e1f23',
        tertiary: '#2e2f33',
        quaternary: '#3e3f43'
      },
      borderColor: {
        primary: '#0e0f12',
        secondary: '#1e1f23',
        tertiary: '#2e2f33',
        quaternary: '#3e3f43'
      },
      textColor: {
        primary: '#ffffff',
        secondary: '#d1d5db',
        tertiary: '#9ca3af'
      }
    }
  },
  plugins: []
};
