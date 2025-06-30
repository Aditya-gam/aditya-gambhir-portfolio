import { motion } from 'framer-motion';
import { Chip } from '@/components/ui/chip';
import { getSkillColors, getSkillIcon, SkillCategory } from '@/data/skills';
import type { VariantProps } from 'class-variance-authority';

interface SkillsMatrixProps {
  readonly skillsMatrix: readonly {
    readonly category: string;
    readonly items: readonly string[];
  }[];
  readonly heading?: string;
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

type ChipVariant = NonNullable<
  VariantProps<typeof import('@/components/ui/chip').chipVariants>['variant']
>;

/**
 * Get the variant name for a skill category
 * @param category - The skill category name
 * @returns The variant name for the Chip component
 */
function getCategoryVariant(category: string): ChipVariant {
  const categoryMap: Record<string, ChipVariant> = {
    Languages: 'languages',
    Frameworks: 'frameworks',
    'Data / AI': 'dataAi',
    'Cloud & DevOps': 'cloudDevops',
    Databases: 'databases',
    Tooling: 'tooling',
  };

  return categoryMap[category] || 'default';
}

/**
 * SkillsMatrix component with icon grid layout and color-coded categories
 * Features 4 rows on desktop, auto 2 on mobile with proper accessibility
 */
export default function SkillsMatrix({
  skillsMatrix,
  heading = 'Skills Matrix',
}: SkillsMatrixProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{heading}</h2>

      {/* Icon Grid Layout - 4 rows on desktop, auto 2 on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {skillsMatrix.map((skillGroup) => (
          <motion.div
            key={skillGroup.category}
            variants={fadeInUp}
            className="flex flex-col items-center text-center p-4 rounded-lg border border-border hover:border-primary/30 transition-colors duration-200"
          >
            {/* Category Icon */}
            <div className="w-12 h-12 mb-3 flex items-center justify-center rounded-lg bg-primary/10">
              <span className="text-2xl">
                {getSkillIcon(skillGroup.items[0] || '💻')}
              </span>
            </div>

            {/* Category Title */}
            <h3 className="text-sm font-semibold text-primary mb-2">
              {skillGroup.category}
            </h3>

            {/* Skill Count */}
            <p className="text-xs text-muted-foreground">
              {skillGroup.items.length} skills
            </p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Skills by Category */}
      <div className="space-y-8">
        {skillsMatrix.map((skillGroup) => (
          <motion.div key={skillGroup.category} variants={fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
              <span className="text-xl">
                {getSkillIcon(skillGroup.items[0] || '💻')}
              </span>
              {skillGroup.category}
            </h3>

            {/* Skills Grid - Responsive wrapping */}
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  icon={<span className="text-sm">{getSkillIcon(skill)}</span>}
                  variant={getCategoryVariant(skillGroup.category)}
                  size="sm"
                  className="transition-all duration-200 hover:scale-105"
                  aria-label={`${skill} - ${skillGroup.category} skill`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
