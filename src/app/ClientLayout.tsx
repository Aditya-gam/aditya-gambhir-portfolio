'use client';

import { useState, useMemo } from 'react';
import { Toaster } from 'sonner';
import Header from '@/components/Header';
import { ContactModal } from '@/components/ContactModal';
import { ContactModalContext } from '@/app/ContactModalContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import {
  ResumeModalProvider,
  useResumeModal,
} from '@/contexts/ResumeModalContext';
import ResumeModal from '@/components/modals/ResumeModal';

interface ClientLayoutProps {
  readonly children: React.ReactNode;
}

function ModalPortal() {
  const { isOpen, selectedResume, closeModal } = useResumeModal();

  return (
    <ResumeModal
      isOpen={isOpen}
      onClose={closeModal}
      selectedResume={selectedResume}
    />
  );
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const contextValue = useMemo(
    () => ({
      isOpen: isContactModalOpen,
      openContactModal,
      closeContactModal,
    }),
    [isContactModalOpen],
  );

  return (
    <ThemeProvider>
      <ContactModalContext.Provider value={contextValue}>
        <ResumeModalProvider>
          <Header onContactClick={openContactModal} />
          {children}
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
          />
          <ModalPortal />
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={5000}
          />
        </ResumeModalProvider>
      </ContactModalContext.Provider>
    </ThemeProvider>
  );
}
