'use client';

import { createContext } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

export const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  openContactModal: () => {},
  closeContactModal: () => {},
});
