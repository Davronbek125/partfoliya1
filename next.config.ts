import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/uz",
        permanent: true,
      },
      {
        source: "/:locale(uz|ru|en)/sohalar",
        destination: "/:locale#industries",
        permanent: false,
      },
      {
        source: "/:locale(uz|ru|en)/jarayon",
        destination: "/:locale#process",
        permanent: false,
      },
      {
        source: "/:locale(uz|ru|en)/paketlar",
        destination: "/:locale#packages",
        permanent: false,
      },
      {
        source: "/:locale(uz|ru|en)/aloqa",
        destination: "/:locale#diagnostic",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
