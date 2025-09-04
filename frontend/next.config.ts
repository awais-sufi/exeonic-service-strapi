/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "phenomenal-positivity-67d27683f9.media.strapiapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
