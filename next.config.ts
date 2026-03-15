import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
    },
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev', // Public R2 bucket URLs
      },
      // Add your specific R2 public URL domain here
      {
        protocol: 'https',
        hostname: 'pub-875ac0de246c405990a329dd8a3f92ff.r2.dev',
      },
      // CMS domain for media proxy (when R2_PUBLIC_URL not configured)
      {
        protocol: 'https',
        hostname: 'cms.projecti.ch',
      },
    ]
  }
};

export default nextConfig;
