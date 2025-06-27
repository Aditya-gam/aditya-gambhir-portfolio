import { motion } from 'framer-motion';
import { FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroCTAGroupProps {
  readonly onContactClick: () => void;
  readonly onResumeClick?: () => void;
  readonly className?: string;
}

/**
 * HeroCTAGroup component provides consistent call-to-action buttons for hero sections
 * @param onContactClick - Function to handle contact button click
 * @param onResumeClick - Optional function to handle resume button click (for modal)
 * @param className - Additional CSS classes
 */
export default function HeroCTAGroup({
  onContactClick,
  onResumeClick,
  className = '',
}: HeroCTAGroupProps) {
  return (
    <motion.div
      className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Button
        onClick={onResumeClick}
        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        size="lg"
      >
        <FileText className="w-4 h-4 mr-2" />
        Download Resume
      </Button>

      <Button
        onClick={onContactClick}
        variant="outline"
        className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200"
        size="lg"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Let&apos;s Talk
      </Button>
    </motion.div>
  );
}
