module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(max-height: 800px)' },
        stall: { raw: '(max-height: 600px)' },
      },
    },
  },
  plugins: [],
};
