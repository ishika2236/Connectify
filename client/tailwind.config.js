/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
    './index.html',             
  ],
  theme: {
    extend: {
      width: {
        '120': '30rem', 
        '144': '36rem', 
        '160': '40rem',
        '200': '50rem'
      },
      colors: {
        
        gray:
        {
          dark: '#111827',
          medium: '#1f2937',
          light: '#3c4350',
          vlight: '#d0d1d5',
          vvlight: ''
        },
        purple: {
          light: '#7d46b3',
          dark: '#8045b1',
          medium: '#704abb',

        },
        pink: '#ca3182',
        mauve: {
          muted: '#9F7C94',  // New muted mauve for a soft accent
        },
        gold: {
          DEFAULT: '#CBA135', // Rich gold tone
        },
        white: {
          off: '#E5E5E5',  // Soft ivory gray off-white
        },
        charcoal: '#2E2E33',
      },
    },
  },
  plugins: [],
}
