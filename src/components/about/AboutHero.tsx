import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';
import AboutGrid from './AboutGrid';

interface AboutHeroProps {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly onContactClick: () => void;
  readonly imageVariant?: 'rounded' | 'rounded-square';
}

/**
 * AboutHero component using the new AboutGrid layout
 * Supports both rounded and rounded-square image variants
 */
export default function AboutHero({
  name,
  title,
  description,
  image,
  onContactClick,
  imageVariant = 'rounded',
}: Readonly<AboutHeroProps>) {
  return (
    <AboutGrid
      name={name}
      title={title}
      description={description}
      image={image}
      imageVariant={imageVariant}
    >
      {/* CTA Buttons */}
      <div className="cta-section flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Link
          href="/resume"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Resume
        </Link>
        <button
          onClick={onContactClick}
          className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Let&apos;s Talk
        </button>
      </div>
    </AboutGrid>
  );
}
