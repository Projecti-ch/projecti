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
  },
  // Only HSTS was being sent (by Vercel). The one that matters here is CSP:
  // without it the Google Analytics tag is unconstrained, so a compromised GA
  // property could run arbitrary JS on projecti.ch with nothing to stop it.
  // 'unsafe-inline' on script-src is still required by next/script's inline
  // gtag config and by Next's own bootstrap; tightening that needs nonces.
  async headers() {
    const csp = [
      "default-src 'self'",
      // www.gstatic.com serves Mux's Chromecast sender script.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.gstatic.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://cms.projecti.ch https://image.mux.com https://*.r2.dev https://*.r2.cloudflarestorage.com https://www.googletagmanager.com",
      // Mux serves storyboards from image.mux.com and video segments from
      // per-region subdomains, so both need the wildcard rather than just
      // stream.mux.com. Pinning it tighter blocks playback outright.
      "media-src 'self' blob: https://*.mux.com",
      // GA4 beacons go to regional subdomains (region1.google-analytics.com),
      // not just www, so the wildcard is required or nothing is recorded.
      "connect-src 'self' https://cms.projecti.ch https://*.mux.com https://*.litix.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "frame-src https://cal.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
