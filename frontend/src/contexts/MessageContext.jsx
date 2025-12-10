// 🔵 PABLO - UI Architect
// MessageContext.jsx - Shared state for message modal

import { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const openMessages = () => setIsMessageModalOpen(true);
  const closeMessages = () => setIsMessageModalOpen(false);

  return (
    <MessageContext.Provider value={{ isMessageModalOpen, openMessages, closeMessages }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
}
