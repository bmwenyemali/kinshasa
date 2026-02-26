/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: require("path").join(__dirname, "../../"),
  transpilePackages: [
    "@kinservices/api",
    "@kinservices/database",
    "@kinservices/ui",
  ],
  serverExternalPackages: ["@prisma/client", "prisma"],
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
