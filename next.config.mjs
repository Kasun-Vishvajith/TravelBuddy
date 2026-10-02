/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.TRAVELBUDDY_PREVIEW_DIR || '.next',
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] }
};

export default nextConfig;
