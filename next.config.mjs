/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ['images.unsplash.com','i.ytimg.com'],
  },
};

export default nextConfig;
