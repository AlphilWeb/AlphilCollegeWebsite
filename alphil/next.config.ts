import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary images
    // Optional: Configure other image settings
    // formats: ['image/webp'],
    // minimumCacheTTL: 60,
  },
};

export default nextConfig;