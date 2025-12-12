/**
 * ============================================================================
 * MESSAGE MODAL COMPONENT (TopBar)
 * ============================================================================
 * 
 * File: frontend/src/components/layout/TopBar/MessageModal/MessageModal.jsx
 * Assigned to: CRYSTAL
 * 
 * Messaging modal accessed from TopBar.
 * 
 * TODO:
 * - [ ] Show conversations list
 * - [ ] Message thread view when conversation selected
 * - [ ] Send new messages
 * - [ ] Real-time updates (stretch)
 * - [ ] Close button/escape key
 * 
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import './MessageModal.scss';

const MessageModal = ({ isOpen, onClose }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // TODO: Fetch conversations
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={(e) => e.stopPropagation()}>
        {/* TODO: Conversations list */}
        {/* TODO: Message thread */}
        {/* TODO: Message input */}
        <p>MessageModal - Implement me!</p>
      </div>
    </div>
  );
};

export default MessageModal;
