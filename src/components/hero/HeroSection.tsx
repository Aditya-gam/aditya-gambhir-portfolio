import Image from 'next/image';
import { motion } from 'framer-motion';
import { OpportunityBadge, HeroCTAGroup, ScrollCue } from '@/components/hero';
import SocialProfiles from '@/components/SocialProfiles';
import { getFeaturedSocialProfiles } from '@/data/socials';
import { useResumeModal } from '@/contexts/ResumeModalContext';
import { useContext } from 'react';
import { ContactModalContext } from '@/app/ContactModalContext';

interface HeroSectionProps {
  readonly className?: string;
}

/**
 * HeroSection component implements the Phase 2 hero redesign with all required elements
 * @param className - Additional CSS classes
 */
export default function HeroSection({ className = '' }: HeroSectionProps) {
  const socialProfiles = getFeaturedSocialProfiles();
  const { openModal } = useResumeModal();
  const { openContactModal } = useContext(ContactModalContext);

  const handleResumeClick = () => {
    openModal(); // Opens the resume modal
  };

  return (
    <motion.section
      id="hero"
      className={`hero-section ${className}`}
      aria-labelledby="hero-heading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Opportunity Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <OpportunityBadge />
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="hero-image mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src="/headshot1.webp"
            alt="Aditya Gambhir - Software Engineer"
            width={180}
            height={180}
            className="rounded-full object-cover shadow-lg shadow-primary/20"
            priority
            sizes="180px"
            style={{
              width: 'auto',
              height: 'auto',
            }}
          />
        </motion.div>

        {/* Gradient Headline */}
        <motion.h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Hello, I&apos;m Aditya
        </motion.h1>

        {/* Static Subtitle */}
        <motion.h2
          className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Software Engineer & Data Scientist
        </motion.h2>

        {/* Meta Copy Slot */}
        <motion.p
          className="hero-content text-hero max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          M.S. Computational Data Science graduate transforming cutting-edge ML,
          computer vision and real-time sensor fusion into scalable,
          user-centric software.
        </motion.p>

        {/* CTA Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-8"
        >
          <HeroCTAGroup
            onContactClick={openContactModal}
            onResumeClick={handleResumeClick}
          />
        </motion.div>

        {/* Social Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <SocialProfiles profiles={socialProfiles} title="" />
        </motion.div>

        {/* Scroll Cue */}
        <ScrollCue />
      </div>
    </motion.section>
  );
}
