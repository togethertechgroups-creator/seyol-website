/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'seyolpregnancycare.com'],
  },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
