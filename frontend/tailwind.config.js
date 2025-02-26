/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        cedarville: ['"Cedarville Cursive"', 'cursive'], 
        charm: ['"Charm"', 'cursive'], 
      },
      colors: {
        'gray-light': '#e7eaf6',
        'gray-medium': '#a2a8d3',
        'gray-dark': '#38598b',
        'gray-verydark': '#113f67',
        'blue-light': '#dbeafe', 
        'blue-medium': '#3b82f6', 
        'blue-dark': '#1e40af', 
        'blue-verydark': '#0f172a',
        //Darkmode
        "dark-gray-light": "#242933",
        "dark-gray-medium": "#457ccf",
        "dark-gray-dark": "#888eb0",
        "dark-gray-verydark": "#c2c6d0",
        "dark-grey-border": "#3E3F4E", // grey border
        "dark-very-dark-grey": "#20212C", // for bg
        "dark-dark-grey": "#2B2C37", // for bg on sidebar and header
      },
      cursor: {
        warning: 'url(/path-to-warning-cursor.png), pointer', // Custom warning cursor
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};



