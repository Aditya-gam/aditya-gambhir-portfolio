import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';

interface AboutHeroProps {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  onContactClick: () => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function AboutHero({
  name,
  title,
  description,
  image,
  onContactClick,
}: Readonly<AboutHeroProps>) {
  return (
    <motion.section
      className="hero-section mb-16"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
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
              className="rounded-full object-cover shadow-lg shadow-indigo-500/20"
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

          {/* CTA Buttons */}
          <div className="cta-section">
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
        </motion.div>
      </div>
    </motion.section>
  );
}
