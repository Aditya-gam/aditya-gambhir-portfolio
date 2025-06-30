import { MetadataRoute } from 'next';
import { SITEMAP_CONFIG } from '@/data/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_CONFIG.pages.map((page) => ({
    url: `${SITEMAP_CONFIG.baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
