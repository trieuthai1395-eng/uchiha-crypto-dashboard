/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',   // Quan trọng
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;