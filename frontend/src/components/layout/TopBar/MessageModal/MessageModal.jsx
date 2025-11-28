// 🔵 PABLO - UI Architect
// MessageModal.jsx - Full-screen messaging modal with blurred backdrop

import './MessageModal.css';

function MessageModal({ onClose }) {
  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="message-modal-header">
          <h2 className="message-modal-title">Messages</h2>
          <button className="message-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body - Two column layout */}
        <div className="message-modal-body">
          {/* Left: Conversations List */}
          <div className="message-conversations">
            <div className="conversations-header">
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="conversations-search"
              />
            </div>
            <div className="conversations-list">
              {/* TODO: Map through conversations */}
              <div className="conversation-item">
                <div className="conversation-avatar">SC</div>
                <div className="conversation-info">
                  <span className="conversation-name">Sarah Chen</span>
                  <span className="conversation-preview">Hey! Are you coming to...</span>
                </div>
                <span className="conversation-time">2m</span>
              </div>
              {/* Placeholder items */}
              <div className="conversation-item">
                <div className="conversation-avatar">JD</div>
                <div className="conversation-info">
                  <span className="conversation-name">John Doe</span>
                  <span className="conversation-preview">That sounds great!</span>
                </div>
                <span className="conversation-time">1h</span>
              </div>
            </div>
          </div>

          {/* Right: Chat View */}
          <div className="message-chat">
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="chat-avatar">SC</div>
                <span className="chat-username">Sarah Chen</span>
              </div>
            </div>
            <div className="chat-messages">
              {/* TODO: Map through messages */}
              <div className="chat-message received">
                <p>Hey! Are you coming to the meetup tonight?</p>
                <span className="message-time">2:30 PM</span>
              </div>
              <div className="chat-message sent">
                <p>Yes! I'll be there around 7</p>
                <span className="message-time">2:32 PM</span>
              </div>
            </div>
            <div className="chat-composer">
              <textarea 
                placeholder="Type a message..." 
                className="chat-textarea"
                rows="1"
              />
              <button className="chat-send-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
