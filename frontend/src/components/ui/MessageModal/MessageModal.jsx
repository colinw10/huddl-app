/**
 * =============================================================================
 * MESSAGE MODAL COMPONENT
 * =============================================================================
 *
 * File: frontend/src/components/ui/MessageModal/MessageModal.jsx
 * Assigned to: TITO
 * Responsibility: Direct messaging modal for sending messages to friends
 *
 * TODO:
 * - [ ] Create modal overlay with glassmorphism styling
 * - [ ] Add message input textarea with character limit
 * - [ ] Implement send message functionality
 * - [ ] Add message history display (if conversation exists)
 * - [ ] Handle loading states during send
 * - [ ] Add close button and escape key handling
 * - [ ] Integrate with messaging API endpoint
 * - [ ] Add real-time message updates (stretch goal)
 * - [ ] Add emoji picker (stretch goal)
 *
 * Props:
 * - isOpen (boolean): Whether modal is visible
 * - onClose (function): Callback to close modal
 * - recipient (object): User to send message to { id, username, avatar_url }
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { useState } from 'react';
import './MessageModal.scss';

const MessageModal = ({ isOpen, onClose, recipient }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // TODO: Tito - Implement message sending
  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsSending(true);
    try {
      // TODO: Call messaging API
      // await apiClient.post('/api/messages/', {
      //   recipient_id: recipient.id,
      //   content: message
      // });
      console.log('Sending message to:', recipient?.username, message);
      setMessage('');
      onClose();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  // TODO: Tito - Handle escape key to close
  // TODO: Tito - Prevent body scroll when modal is open

  if (!isOpen) return null;

  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={(e) => e.stopPropagation()}>
        {/* TODO: Tito - Modal header with recipient info */}
        <div className="message-modal__header">
          <h3>Message {recipient?.username || 'User'}</h3>
          <button className="message-modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* TODO: Tito - Message history area */}
        <div className="message-modal__history">
          <p className="placeholder-text">Message history will appear here</p>
        </div>

        {/* TODO: Tito - Message input area */}
        <div className="message-modal__input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            maxLength={500}
          />
          <div className="message-modal__actions">
            <span className="char-count">{message.length}/500</span>
            <button
              className="btn-send"
              onClick={handleSend}
              disabled={!message.trim() || isSending}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
