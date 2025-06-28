'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface StatItem {
  readonly value: string;
  readonly label: string;
  readonly isNumeric?: boolean;
}

interface StatsCounterProps {
  readonly stats: StatItem[];
  readonly className?: string;
}

/**
 * StatsCounter component displays statistics in animated counter cards
 * @param stats - Array of statistics to display
 * @param className - Additional CSS classes
 */
export default function StatsCounter({
  stats,
  className = '',
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.5,
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.3 : 0.8,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`mb-12 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.label}-${index}`}
            className="group relative"
            variants={cardVariants}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }
            }
          >
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/30 group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:via-primary/10 group-hover:to-secondary/15">
              <motion.div
                className="text-2xl md:text-3xl font-bold text-primary mb-2"
                variants={numberVariants}
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </motion.div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
