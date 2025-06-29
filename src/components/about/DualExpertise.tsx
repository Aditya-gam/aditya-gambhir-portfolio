import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface DualExpertiseProps {
  readonly dualExpertise: {
    readonly dataScientist: {
      readonly title: string;
      readonly achievements: readonly string[];
      readonly technologies: readonly string[];
    };
    readonly softwareEngineer: {
      readonly title: string;
      readonly achievements: readonly string[];
      readonly technologies: readonly string[];
    };
  };
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

export default function DualExpertise({ dualExpertise }: DualExpertiseProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Dual Expertise</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Data Scientist Card */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 shadow-sm h-full flex flex-col">
            <CardContent className="p-0 flex flex-col flex-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">
                  {dualExpertise.dataScientist.title}
                </h3>
              </div>
              <ul className="space-y-2 mb-4 text-muted-foreground">
                {dualExpertise.dataScientist.achievements.map((achievement) => (
                  <li key={achievement}>• {achievement}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {dualExpertise.dataScientist.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-sm rounded-full border border-secondary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Software Engineer Card */}
        <motion.div variants={fadeInUp}>
          <Card className="p-6 shadow-sm h-full flex flex-col">
            <CardContent className="p-0 flex flex-col flex-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">
                  {dualExpertise.softwareEngineer.title}
                </h3>
              </div>
              <ul className="space-y-2 mb-4 text-muted-foreground">
                {dualExpertise.softwareEngineer.achievements.map(
                  (achievement) => (
                    <li key={achievement}>• {achievement}</li>
                  ),
                )}
              </ul>
              <div className="flex flex-wrap gap-2">
                {dualExpertise.softwareEngineer.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
