/** @type {import('next').NextConfig} */
const production = process.env.NODE_ENV == "production";
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pl"],
    defaultLocale: "pl",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/d/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' https://vitals.vercel-insights.com https://www.google.com/recaptcha/ ; form-action 'self'; frame-src 'self' https://www.google.com/recaptcha/; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' https://lh3.googleusercontent.com https://stamen-tiles.a.ssl.fastly.net https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org data: ; script-src 'self' ${
              production ? "" : "'unsafe-eval'"
            } https://apis.google.com  https://vitals.vercel-insights.com/  https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ ;`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
