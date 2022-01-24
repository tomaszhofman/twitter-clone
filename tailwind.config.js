module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          primary: '#D9D9D9',
        },
      },
      screens: {
        tall: { raw: '(max-height: 800px)' },
        stall: { raw: '(max-height: 600px)' },
      },
    },
  },
  plugins: [],
};
