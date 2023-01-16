/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['images.punkapi.com'],
  },
};

module.exports = nextConfig;
