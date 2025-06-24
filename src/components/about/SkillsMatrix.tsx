import { motion } from 'framer-motion';

interface SkillsMatrixProps {
  readonly skillsMatrix: readonly {
    readonly category: string;
    readonly items: readonly string[];
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

export default function SkillsMatrix({ skillsMatrix }: SkillsMatrixProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Skills Matrix</h2>
      <div className="space-y-6">
        {skillsMatrix.map((skillGroup) => (
          <motion.div key={skillGroup.category} variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-3 text-indigo-400">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-2 bg-card border border-border rounded-lg text-sm hover:border-indigo-400 hover:shadow-md transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
