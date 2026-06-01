/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cho phép fetch từ CoinGecko và Anthropic
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
