import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutHeroProps {
  name: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  resumes: {
    ds: string;
    sde: string;
  };
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
  resumes,
}: AboutHeroProps) {
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href={resumes.ds}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-violet-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
            >
              View Résumé (DS)
            </a>
            <a
              href={resumes.sde}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-400 text-indigo-400 font-medium rounded-lg hover:bg-indigo-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 transition-all duration-200"
            >
              View Résumé (SDE)
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
