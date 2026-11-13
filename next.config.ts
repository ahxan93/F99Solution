import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The three original sample posts were replaced by in-depth guides; keep the old URLs working.
  async redirects() {
    return [
      {
        source: "/blog/google-ads-budget-guide",
        destination: "/blog/meta-ads-vs-google-ads-india",
        permanent: true,
      },
      {
        source: "/blog/local-seo-checklist-mumbai",
        destination: "/blog/local-seo-mumbai-guide",
        permanent: true,
      },
      {
        source: "/blog/meta-ads-creative-testing",
        destination: "/blog/meta-ads-vs-google-ads-india",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
