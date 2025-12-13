module.exports = {
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e6e4',
          100: '#f5e6e4',
          200: '#e6c9c6',
          300: '#d6aca8',
          400: '#c78f8a',
          500: '#b34034', // Main burgundy red
          600: '#9a362d',
          700: '#822c26',
          800: '#6a221f',
          900: '#521818',
        },
        // Burgundy accent colors
        accent: {
          50: '#fef7f6',
          100: '#fdeeed',
          200: '#fad5d1',
          300: '#f7bcb5',
          400: '#f4a399',
          500: '#d2691e',
          600: '#b85a1a',
          700: '#9e4b15',
          800: '#843c10',
          900: '#6a2d0b',
        },
      },
    },
  },
  plugins: [],
}
