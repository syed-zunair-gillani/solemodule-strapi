/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["admin.solemodule.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.solemodule.com",
      },
    ],
  },
};

export default nextConfig;
