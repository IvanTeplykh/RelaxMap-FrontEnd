import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.onrender.com" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "http", hostname: "localhost", port: "3000" },
      // Для локал тесту
      {
        protocol: "https",
        hostname: "ftp.goit.study",
        pathname: "/img/relax-map/**",
      },
    ],
  },
};

export default nextConfig;
