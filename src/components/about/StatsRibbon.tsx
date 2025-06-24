import { motion } from 'framer-motion';

interface StatsRibbonProps {
  readonly stats: {
    readonly experience: string;
    readonly projects: string;
    readonly gpa: string;
    readonly publications: string;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function StatsRibbon({ stats }: StatsRibbonProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">
              {stats.experience}
            </div>
            <div className="text-sm text-muted-foreground">
              Years in Software/Data
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">
              {stats.projects}
            </div>
            <div className="text-sm text-muted-foreground">
              Projects Delivered
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">
              {stats.gpa}
            </div>
            <div className="text-sm text-muted-foreground">M.S. GPA</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-400 mb-1">
              {stats.publications}
            </div>
            <div className="text-sm text-muted-foreground">
              Peer-reviewed Publications
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
