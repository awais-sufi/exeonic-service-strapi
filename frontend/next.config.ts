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
        hostname: "**.strapiapp.com", // wildcard covers any Strapi subdomain
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
