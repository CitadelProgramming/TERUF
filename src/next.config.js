// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'ddrfumcaletdzcdoglyl.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;