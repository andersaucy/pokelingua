import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/introduction", destination: "/about", permanent: true },
      { source: "/timeline", destination: "/history", permanent: true },
    ];
  },
};

export default nextConfig;
