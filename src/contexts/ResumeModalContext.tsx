import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { ResumeData } from '@/data/resume';

interface ResumeModalContextType {
  readonly isOpen: boolean;
  readonly selectedResume?: ResumeData;
  readonly openModal: (resume?: ResumeData) => void;
  readonly closeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(
  undefined,
);

interface ResumeModalProviderProps {
  readonly children: ReactNode;
}

/**
 * ResumeModalProvider provides context for managing resume modal state
 * @param children - React children components
 */
export function ResumeModalProvider({ children }: ResumeModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState<ResumeData | undefined>(
    undefined,
  );

  const openModal = (resume?: ResumeData) => {
    setSelectedResume(resume);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedResume(undefined);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      selectedResume,
      openModal,
      closeModal,
    }),
    [isOpen, selectedResume],
  );

  return (
    <ResumeModalContext.Provider value={contextValue}>
      {children}
    </ResumeModalContext.Provider>
  );
}

/**
 * useResumeModal hook provides access to resume modal context
 * @returns ResumeModalContextType
 * @throws Error if used outside of ResumeModalProvider
 */
export function useResumeModal(): ResumeModalContextType {
  const context = useContext(ResumeModalContext);
  if (context === undefined) {
    throw new Error('useResumeModal must be used within a ResumeModalProvider');
  }
  return context;
}
