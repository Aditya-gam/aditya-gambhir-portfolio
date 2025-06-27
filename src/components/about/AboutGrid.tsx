import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AboutGridProps {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly children?: React.ReactNode;
  readonly imageVariant?: 'rounded' | 'rounded-square';
  readonly className?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * AboutGrid component for responsive layout with headshot and content
 * Supports both rounded and rounded-square image variants
 */
export default function AboutGrid({
  name,
  title,
  description,
  image,
  children,
  imageVariant = 'rounded',
  className,
}: Readonly<AboutGridProps>) {
  return (
    <motion.section
      className={cn('hero-section mb-16', className)}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="grid md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto">
        {/* Left - Headshot (35%) */}
        <motion.div
          className="md:col-span-2 flex justify-center"
          variants={fadeInUp}
        >
          <div className="relative">
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              className={cn(
                'object-cover shadow-lg shadow-indigo-500/20',
                imageVariant === 'rounded' ? 'rounded-full' : 'rounded-2xl',
              )}
              priority
            />
          </div>
        </motion.div>

        {/* Right - Text Content (65%) */}
        <motion.div
          className="md:col-span-3 text-center md:text-left"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            {name}
          </h1>
          <h2 className="text-2xl text-muted-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          {/* Additional content (CTA buttons, etc.) */}
          {children && <motion.div variants={fadeInUp}>{children}</motion.div>}
        </motion.div>
      </div>
    </motion.section>
  );
}
