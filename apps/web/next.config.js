/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@kinservices/api",
    "@kinservices/database",
    "@kinservices/ui",
  ],
  serverExternalPackages: ["@prisma/client"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dsgizthan/**",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
    ],
  },
};

module.exports = nextConfig;
