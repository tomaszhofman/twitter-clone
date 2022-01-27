module.exports = {
  mode: 'jit',
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
      animation: {
        faveLikeBtnSvg: 'faveLikeBtnSvg 1s steps(28)',
      },
      keyframes: {
        faveLikeBtnSvg: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-1400px 0' },
        },
      },
    },
  },
  plugins: [],
};
