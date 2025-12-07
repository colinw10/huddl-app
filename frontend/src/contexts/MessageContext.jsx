/**
 * =============================================================================
 * MESSAGE CONTEXT
 * =============================================================================
 * 
 * File: frontend/src/contexts/MessageContext.jsx
 * Assigned to: TITO
 * Responsibility: Global messaging/notifications state
 * 
 * TODO:
 * - [ ] Implement fetchMessages() - load messages
 * - [ ] Implement sendMessage(recipientId, content) - send new message
 * - [ ] Implement markAsRead(messageId) - mark message read
 * 
 * Status: PLACEHOLDER (Stretch Goal)
 * =============================================================================
 */

import React, { createContext, useContext, useState } from 'react';

// Create the context
const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  // State for messages
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Tito - Implement fetchMessages
  const fetchMessages = async () => {
    console.log('Tito: Implement fetchMessages()');
  };

  // TODO: Tito - Implement sendMessage
  const sendMessage = async (recipientId, content) => {
    console.log('Tito: Implement sendMessage()', recipientId, content);
    return { success: false, error: 'Not implemented' };
  };

  // TODO: Tito - Implement markAsRead
  const markAsRead = async (messageId) => {
    console.log('Tito: Implement markAsRead()', messageId);
  };

  const value = {
    messages,
    unreadCount,
    isLoading,
    fetchMessages,
    sendMessage,
    markAsRead,
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook for easy access
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export default MessageContext;
