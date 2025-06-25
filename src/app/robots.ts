import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/', '/.well-known/appspecific/'],
    },
    sitemap: 'https://aditya-gambhir-portfolio.vercel.app/sitemap.xml',
    host: 'https://aditya-gambhir-portfolio.vercel.app',
  };
}
