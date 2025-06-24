import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface EducationProps {
  readonly education: {
    readonly degree: string;
    readonly school: string;
    readonly gpa: string;
    readonly courses: readonly string[];
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function Education({ education }: EducationProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
      <Card className="p-6 shadow-sm max-w-2xl mx-auto">
        <CardContent className="p-0">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{education.degree}</h3>
            <p className="text-primary mb-2">{education.school}</p>
            <p className="text-muted-foreground mb-4">GPA: {education.gpa}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {education.courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
