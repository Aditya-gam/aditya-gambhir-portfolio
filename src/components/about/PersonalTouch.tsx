import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface PersonalTouchProps {
  personalTouch: {
    favoriteStack: string;
    hobbies: string[];
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function PersonalTouch({ personalTouch }: PersonalTouchProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Quick Facts</h2>
      <Card className="p-6 shadow-sm max-w-2xl mx-auto text-center">
        <CardContent className="p-0">
          <div className="space-y-3 text-muted-foreground">
            <p>
              <span className="text-foreground font-medium">
                Favorite Stack:
              </span>{' '}
              {personalTouch.favoriteStack}
            </p>
            <p>
              <span className="text-foreground font-medium">
                Coffee Aficionado:
              </span>{' '}
              {personalTouch.hobbies[0]}
            </p>
            <p>
              <span className="text-foreground font-medium">
                Amateur Guitarist:
              </span>{' '}
              {personalTouch.hobbies[1]}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
