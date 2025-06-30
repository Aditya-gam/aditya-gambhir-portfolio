import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award } from 'lucide-react';
import { UI_COPY } from '@/data/ui';

interface EducationRecord {
  readonly degree: string;
  readonly school: string;
  readonly gpa: string;
  readonly courses: readonly string[];
}

interface EducationProps {
  readonly education: readonly EducationRecord[];
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

const educationCardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -2, scale: 1.01 },
};

export default function Education({ education }: EducationProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
      aria-labelledby="education-heading"
    >
      <h2
        id="education-heading"
        className="text-2xl font-bold mb-8 text-center"
      >
        {UI_COPY.education.heading}
      </h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={`${edu.school}-${edu.degree}`}
            variants={educationCardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <article aria-labelledby={`education-${index}-title`}>
                  <div className="flex items-start gap-4">
                    {/* Education Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <GraduationCap
                          className="w-5 h-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Education Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div className="flex-1">
                          <h3
                            id={`education-${index}-title`}
                            className="text-xl font-semibold text-foreground mb-1"
                          >
                            {edu.degree}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {edu.school}
                          </p>
                        </div>

                        {/* GPA Badge */}
                        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                          <Award
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-primary">
                            GPA: {edu.gpa}
                          </span>
                        </div>
                      </div>

                      {/* Relevant Coursework */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                          {UI_COPY.education.relevantCoursework}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course) => (
                            <span
                              key={course}
                              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 transition-colors hover:bg-primary/20"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
