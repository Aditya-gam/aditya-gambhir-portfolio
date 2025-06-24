import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface EducationProps {
  education: {
    degree: string;
    school: string;
    gpa: string;
    courses: string[];
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
            <p className="text-indigo-400 mb-2">{education.school}</p>
            <p className="text-muted-foreground mb-4">GPA: {education.gpa}</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {education.courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-sm rounded-full border border-indigo-500/20"
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
