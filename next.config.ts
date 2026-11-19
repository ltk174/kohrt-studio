import type { NextConfig } from "next";

/**
 * Statischer Export: `npm run build` erzeugt den Ordner `out/`,
 * der auf Vercel oder auf gewöhnlichem Webhosting (Apache, nginx …) laufen kann.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
