import { MetadataRoute } from 'next';
import { ROBOTS_CONFIG } from '@/data/metadata';

export default function robots(): MetadataRoute.Robots {
  return ROBOTS_CONFIG;
}
