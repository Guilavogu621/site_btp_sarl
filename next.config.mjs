const isDev = process.env.NODE_ENV !== 'production';

// En développement, Turbopack et React s'appuient sur eval() : on autorise
// donc 'unsafe-eval' (et le websocket local du Hot Reload). En production,
// React n'utilise jamais eval() : la CSP reste stricte.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const connectSrc = isDev
  ? "connect-src 'self' https://*.supabase.co wss://*.supabase.co ws://localhost:* http://localhost:*"
  : "connect-src 'self' https://*.supabase.co wss://*.supabase.co";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  scriptSrc,
  connectSrc,
  "upgrade-insecure-requests",
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content-Security-Policy : directives à forte valeur qui ne cassent
          // pas l'app (Next.js injecte des scripts/styles inline au rendu, d'où
          // 'unsafe-inline'). frame-ancestors remplace X-Frame-Options,
          // object-src 'none' bloque les plugins, upgrade-insecure-requests
          // force le HTTPS, et les connexions sortantes sont limitées à
          // l'app + Supabase. 'unsafe-eval' est autorisé uniquement en dev
          // (requis par Turbopack/React), jamais en production.
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
