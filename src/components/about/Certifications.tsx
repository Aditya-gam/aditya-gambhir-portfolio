import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface CertificationsProps {
  readonly certifications: readonly {
    readonly title: string;
    readonly provider: string;
    readonly year: string;
  }[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export default function Certifications({
  certifications,
}: CertificationsProps) {
  return (
    <motion.section
      className="mb-16"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">Certifications</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
          {certifications.map((cert) => (
            <Card key={cert.title} className="p-4 shadow-sm min-w-64">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-2">{cert.title}</h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{cert.provider}</span>
                  <span>{cert.year}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
