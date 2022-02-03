const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pl'],
  },
  localePath: path.resolve('./public/static/locales'),
  react: { useSuspense: false },
  reloadOnPrerender: process.env.NODE_ENV !== 'production',
};
