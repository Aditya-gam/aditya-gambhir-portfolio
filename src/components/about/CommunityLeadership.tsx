import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { UI_COPY } from '@/data/ui';

interface CommunityLeadershipProps {
  readonly community: {
    readonly organization: string;
    readonly role: string;
    readonly period: string;
    readonly description: string;
  };
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function CommunityLeadership({
  community,
}: CommunityLeadershipProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">
        {UI_COPY.communityLeadership.heading}
      </h2>
      <Card className="p-6 shadow-sm max-w-2xl mx-auto">
        <CardContent className="p-0">
          <h3 className="font-semibold mb-2">
            {community.organization} – {community.role}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {community.period}
          </p>
          <p className="text-muted-foreground">{community.description}</p>
        </CardContent>
      </Card>
    </motion.section>
  );
}
