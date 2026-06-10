/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Thử cách này
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;