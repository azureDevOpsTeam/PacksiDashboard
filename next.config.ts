import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generate static export to `out` so CI can deploy via rsync
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
