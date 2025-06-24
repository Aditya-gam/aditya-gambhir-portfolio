import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface ExperienceTimelineProps {
  readonly experience: readonly {
    readonly company: string;
    readonly role: string;
    readonly period: string;
    readonly bullets: readonly string[];
  }[];
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

export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">
        Experience Timeline
      </h2>
      <div className="space-y-8">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            className="relative flex gap-6"
            variants={fadeInUp}
          >
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-lg"></div>
              {index < experience.length - 1 && (
                <div className="w-0.5 h-16 bg-gradient-to-b from-indigo-500 to-violet-500 mt-2"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <Card className="p-6 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <span className="text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-primary mb-3">{exp.role}</p>
                  <p className="text-muted-foreground mb-4">{exp.period}</p>
                  <ul className="space-y-1 text-muted-foreground">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
