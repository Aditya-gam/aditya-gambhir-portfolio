import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface ProfessionalSummaryProps {
  readonly description: string;
  readonly quote: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function ProfessionalSummary({
  description,
  quote,
}: ProfessionalSummaryProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <Card className="p-8 shadow-sm">
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Professional Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
            {description}
          </p>
          <p className="text-indigo-400 text-center mt-4 italic">
            &ldquo;{quote}&rdquo;
          </p>
        </CardContent>
      </Card>
    </motion.section>
  );
}
