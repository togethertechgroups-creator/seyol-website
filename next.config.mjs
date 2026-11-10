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
        destination: '/book',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/our-story',
        permanent: true,
      },
      {
        source: '/our-approach',
        destination: '/our-story#method',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/service-booking-terms',
        permanent: true,
      },
      {
        source: '/privacy-policy',
        destination: '/legal/privacy-policy',
        permanent: true,
      },
      {
        source: '/cookie-policy',
        destination: '/legal/cookie-policy',
        permanent: true,
      },
      {
        source: '/product-disclaimer',
        destination: '/legal/product-disclaimer',
        permanent: true,
      },
      {
        source: '/service-booking-terms',
        destination: '/legal/service-booking-terms',
        permanent: true,
      },
      {
        source: '/class-terms',
        destination: '/legal/class-terms',
        permanent: true,
      },
      {
        source: '/digital-resource-terms',
        destination: '/legal/digital-resource-terms',
        permanent: true,
      },
      {
        source: '/employment-agency-terms',
        destination: '/legal/employment-agency-terms',
        permanent: true,
      },
      {
        source: '/careers-and-training-disclaimer',
        destination: '/legal/careers-and-training-disclaimer',
        permanent: true,
      },
      {
        source: '/resource-bundles',
        destination: '/resources#seyol-bundles',
        permanent: true,
      },
      {
        source: '/video-library',
        destination: '/resources#video-library',
        permanent: true,
      },
      {
        source: '/free-resources',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/training',
        destination: '/careers',
        permanent: true,
      },
      {
        source: '/teacher-resources',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/faqs',
        destination: '/services#packages',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
