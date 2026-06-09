import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.onrender.com" },
      { protocol: "http", hostname: "localhost", port: "5000" },
    ],
  },
};

export default nextConfig;
