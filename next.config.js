/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'pbs.twimg.com', 'lh3.googleusercontent.com'],
  },
  i18n,
};

module.exports = nextConfig;
