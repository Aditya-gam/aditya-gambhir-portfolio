import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// Conditionally apply bundle analyzer
const finalConfig = (() => {
  if (process.env.ANALYZE === 'true') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: true,
      });
      return withBundleAnalyzer(nextConfig);
    } catch (error) {
      console.warn('Bundle analyzer not available:', error);
    }
  }
  return nextConfig;
})();

export default finalConfig;
