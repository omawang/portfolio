// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // You’re not importing .md/.mdx as pages/components anymore
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
