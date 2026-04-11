import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      // Poistetaan Webpackin persistent file-system cache kehitysmoodissa.
      // Tämä estää "Cannot read properties of undefined (reading 'call')"
      // -virheen joka syntyy vanhentuneista chunk-tiedostoista.
      config.cache = false;
    }
    return config;
  },

  async redirects() {
    return [
      // www → non-www (canonical redirect)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pitkansillankatu18.com" }],
        destination: "https://pitkansillankatu18.com/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Turvallisuusheaderit (myös SEO-signaali Googlelle)
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        // Kuvat cachetetaan aggressiivisesti
        source: "/(.*\\.(?:jpg|jpeg|webp|png|svg|gif|ico|woff2?))",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
