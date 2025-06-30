import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { UI_COPY } from '@/data/ui';

interface OpportunityBadgeProps {
  readonly isAvailable?: boolean;
  readonly className?: string;
}

/**
 * OpportunityBadge component displays availability status with animated elements
 * @param isAvailable - Whether the person is available for opportunities
 * @param className - Additional CSS classes
 */
export default function OpportunityBadge({
  isAvailable = true,
  className = '',
}: OpportunityBadgeProps) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
      <span>
        {isAvailable
          ? UI_COPY.opportunityBadge.open
          : UI_COPY.opportunityBadge.closed}
      </span>
      {isAvailable && (
        <motion.div
          className="w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
}
