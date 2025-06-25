import type { NextConfig } from 'next';

// Conditional bundle analyzer import
const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@next/bundle-analyzer')({ enabled: true })
    : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  // Enable static exports for better performance
  // output: 'export', // Uncomment if you want static export

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Headers for CSP - allow LinkedIn scripts and Google Fonts
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://platform.linkedin.com https://badges.linkedin.com https://www.google.com https://www.gstatic.com",
              "connect-src 'self' https://platform.linkedin.com https://www.linkedin.com https://badges.linkedin.com https://www.google.com",
              "img-src 'self' data: https://media.licdn.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Rewrites for better SEO and well-known URI handling
  async rewrites() {
    return [
      {
        source: '/.well-known/security.txt',
        destination: '/api/well-known/security',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
