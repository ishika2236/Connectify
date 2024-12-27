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
      height:{
        '120': '30rem', 
        '144': '36rem', 
        '160': '40rem',
        '200': '50rem'
      },
      boxShadow: {
        'blue': '0 4px 6px rgba(59, 130, 246, 0.5)', 
        'pink':'0 4px 6px rgba(244, 114, 182, 0.5)',
        'pinkNew': '0 4px 6px rgba(249, 168, 212, 0.5)'
      },
      borderWidth: {
        '1': '1px', 
      },
      animation: {
        wiggle: 'wiggle 20s ease-in-out infinite',
        customPulse: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite '
      },
      colors: {
        
        gray:
        {
          darkNew: '#0d1117',
          mediumNew: '#171c24',
          dark: '#111827',
          medium: '#1f2937',
          light: '#3c4350',
          vlight: '#d0d1d5',

        },
        purpleDark :'#a78bfa',
        purpleLight : '#8b5cf6',
        blue: '#315ee3',
        blueNew: '#3B82F6',
        pink: '#ca3182',
        pinkNew: '#F472B6',
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
