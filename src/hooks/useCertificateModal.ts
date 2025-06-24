'use client';

import { useState, useCallback } from 'react';
import type { Certificate } from '@/types';

export function useCertificateModal(certificates: readonly Certificate[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = useCallback(
    (certificate: Certificate) => {
      const index = certificates.findIndex(
        (cert) => cert.title === certificate.title,
      );
      if (index !== -1) {
        setCurrentIndex(index);
        setIsOpen(true);
      }
    },
    [certificates],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigate = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentIndex((prevIndex) => {
        if (direction === 'prev') {
          return prevIndex > 0 ? prevIndex - 1 : certificates.length - 1;
        } else {
          return prevIndex < certificates.length - 1 ? prevIndex + 1 : 0;
        }
      });
    },
    [certificates.length],
  );

  const currentCertificate = isOpen ? certificates[currentIndex] : null;

  return {
    isOpen,
    currentCertificate,
    currentIndex,
    openModal,
    closeModal,
    navigate,
  };
}
