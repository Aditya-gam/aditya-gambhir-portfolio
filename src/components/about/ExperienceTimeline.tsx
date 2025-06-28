import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

interface ExperienceTimelineProps {
  readonly experience: readonly {
    readonly company: string;
    readonly role: string;
    readonly period: string;
    readonly bullets: readonly string[];
  }[];
}

interface ExperienceCardProps {
  readonly experience: {
    readonly company: string;
    readonly role: string;
    readonly period: string;
    readonly bullets: readonly string[];
  };
  readonly isAlternate: boolean;
  readonly index: number;
  readonly isActive: boolean;
  readonly onFocus: () => void;
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

const ExperienceCard = ({
  experience: exp,
  isAlternate,
  index,
  isActive,
  onFocus,
}: ExperienceCardProps) => {
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isActive]);

  return (
    <motion.li
      ref={cardRef}
      className={`relative flex gap-6 ${isAlternate ? 'flex-row-reverse' : ''}`}
      variants={fadeInUp}
      tabIndex={0}
      onFocus={onFocus}
      aria-label={`Experience at ${exp.company} as ${exp.role}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onFocus();
        }
      }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div
          className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-lg"
          aria-hidden="true"
        />
        {index < 1 && ( // This will be properly managed by parent
          <div
            className="w-0.5 h-16 bg-gradient-to-b from-indigo-500 to-violet-500 mt-2"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-8 ${isAlternate ? 'text-right' : ''}`}>
        <Card
          className={`p-6 shadow-sm transition-all duration-200 ${
            isActive ? 'ring-2 ring-primary ring-offset-2 shadow-md' : ''
          }`}
        >
          <CardContent className="p-0">
            <div
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 ${
                isAlternate ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <h3
                className="text-lg font-semibold"
                id={`experience-${index}-title`}
              >
                {exp.company}
              </h3>
              <time
                className="text-sm text-muted-foreground"
                dateTime={exp.period}
              >
                {exp.period}
              </time>
            </div>
            <p
              className="text-primary mb-3 font-medium"
              aria-describedby={`experience-${index}-title`}
            >
              {exp.role}
            </p>
            <ul
              className={`space-y-2 text-muted-foreground ${isAlternate ? 'text-right' : ''}`}
              aria-label={`Responsibilities at ${exp.company}`}
            >
              {exp.bullets.map((bullet, bulletIndex) => (
                <li
                  key={`${exp.company}-bullet-${bulletIndex}-${bullet.slice(0, 20)}`}
                  className={`flex items-start gap-2 ${isAlternate ? 'flex-row-reverse' : ''}`}
                >
                  <span
                    className="text-primary mt-1 flex-shrink-0"
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.li>
  );
};

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const timelineRef = useRef<HTMLElement>(null);

  const handleCardFocus = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (timelineRef.current?.contains(document.activeElement)) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const direction = e.key === 'ArrowDown' ? 1 : -1;
          const newIndex = Math.max(
            0,
            Math.min(experience.length - 1, activeIndex + direction),
          );

          if (newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeIndex, experience.length]);

  return (
    <motion.section
      ref={timelineRef}
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      aria-labelledby="experience-timeline-heading"
    >
      <h2
        id="experience-timeline-heading"
        className="text-2xl font-bold mb-8 text-center"
      >
        Experience Timeline
      </h2>

      <ul className="space-y-8" aria-label="Work experience timeline">
        {experience.map((exp, index) => (
          <ExperienceCard
            key={`${exp.company}-${index}`}
            experience={exp}
            isAlternate={index % 2 === 1}
            index={index}
            isActive={activeIndex === index}
            onFocus={() => handleCardFocus(index)}
          />
        ))}
      </ul>

      <div className="text-center mt-6">
        {/* <p className="text-sm text-muted-foreground">
          Use arrow keys to navigate through experience items
        </p> */}
      </div>
    </motion.section>
  );
}
