import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  experimental: {
    allowedDevOrigins: ["*"],
  },
};

export default nextConfig;
