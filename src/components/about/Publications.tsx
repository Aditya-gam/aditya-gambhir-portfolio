import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface PublicationsProps {
  publications: {
    title: string;
    journal: string;
    year: string;
    quote: string;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function Publications({ publications }: PublicationsProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Publications</h2>
      <Card className="p-6 shadow-sm">
        <CardContent className="p-0">
          <div className="mb-4">
            <h3 className="font-semibold mb-2 flex items-center">
              &ldquo;{publications.title}&rdquo;
              <svg
                className="w-4 h-4 ml-2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </h3>
            <p className="text-sm text-muted-foreground">
              {publications.journal}, {publications.year}
            </p>
          </div>
          <p className="text-indigo-400 text-sm italic">
            &ldquo;{publications.quote}&rdquo;
          </p>
        </CardContent>
      </Card>
    </motion.section>
  );
}
