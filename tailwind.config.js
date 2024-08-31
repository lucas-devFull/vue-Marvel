// tailwind.config.js
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customBlack: '#000000',
        customDarkGray: '#101010',
        'gray-900': '#1f1f1f',
        customMediumGray: '#1f1f1f',
        'gray-800': '#1f1f1f',
        'gray-700': '#1f1f1f',
        customGray: '#2f2f2f',
        'gray-600': '#2f2f2f',
        'gray-500': '#2f2f2f',
        customLightGray: '#6d6d6d',
        'gray-400': '#6d6d6d',
        'gray-300': '#6d6d6d',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
