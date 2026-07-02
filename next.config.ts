import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/juandelsoldato.github.io",
  assetPrefix: "/juandelsoldato.github.io/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
