import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatItem {
  readonly value: string;
  readonly label: string;
}

interface StatsMarqueeProps {
  readonly stats: StatItem[];
  readonly className?: string;
}

/**
 * StatsMarquee component displays statistics in a continuous marquee animation
 * @param stats - Array of statistics to display
 * @param className - Additional CSS classes
 */
export default function StatsMarquee({
  stats,
  className = '',
}: StatsMarqueeProps) {
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

  // Duplicate stats for seamless loop
  const duplicatedStats = [...stats, ...stats];

  return (
    <motion.section
      className={`overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: ['0%', '-50%'],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        >
          {duplicatedStats.map((stat, index) => (
            <div
              key={`${stat.label}-${index}`}
              className="flex flex-col items-center min-w-max"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
