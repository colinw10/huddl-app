// 🔵 PABLO - UI Architect
// MessageModal.jsx - Full-screen messaging modal with blurred backdrop

import { useState } from 'react';
import './MessageModal.css';

function MessageModal({ onClose }) {
  const [messageText, setMessageText] = useState('');
  
  // Calculate charge level (0-4) based on message length
  const getChargeLevel = () => {
    const len = messageText.length;
    if (len === 0) return 0;
    if (len < 10) return 1;
    if (len < 30) return 2;
    if (len < 60) return 3;
    return 4; // Fully charged
  };
  
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
              {/* Conversations */}
              <div className="conversation-item active">
                <img 
                  src="https://ustoa.com/blog/wp-content/uploads/2019/07/northern-lights2-1024x678.jpg" 
                  alt="Pablo Cordero" 
                  className="conversation-avatar-img"
                />
                <div className="conversation-info">
                  <span className="conversation-name">Pablo Cordero</span>
                  <span className="conversation-preview">Hey! Are you coming to...</span>
                </div>
                <span className="conversation-time">2m</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">A</span><span className="initial-2">B</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Arthur Bernier</span>
                  <span className="conversation-preview">That sounds great!</span>
                </div>
                <span className="conversation-time">1h</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">J</span><span className="initial-2">M</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Joshua Miller</span>
                  <span className="conversation-preview">See you there!</span>
                </div>
                <span className="conversation-time">3h</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">N</span><span className="initial-2">P</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Natalia P</span>
                  <span className="conversation-preview">Can't wait 🎉</span>
                </div>
                <span className="conversation-time">5h</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">C</span><span className="initial-2">W</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Colin Weir</span>
                  <span className="conversation-preview">Let's build something cool</span>
                </div>
                <span className="conversation-time">1d</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">T</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Tito</span>
                  <span className="conversation-preview">🔥🔥🔥</span>
                </div>
                <span className="conversation-time">2d</span>
              </div>
              <div className="conversation-item">
                <div className="conversation-avatar"><span className="initial-1">C</span><span className="initial-2">R</span></div>
                <div className="conversation-info">
                  <span className="conversation-name">Crystal Ruiz</span>
                  <span className="conversation-preview">Thanks for the help!</span>
                </div>
                <span className="conversation-time">3d</span>
              </div>
            </div>
          </div>

          {/* Right: Chat View */}
          <div className="message-chat">
            <div className="chat-header">
              <div className="chat-user-info">
                <img 
                  src="https://ustoa.com/blog/wp-content/uploads/2019/07/northern-lights2-1024x678.jpg" 
                  alt="Pablo Cordero" 
                  className="chat-avatar-img"
                />
                <span className="chat-username">Pablo Cordero</span>
              </div>
            </div>
            <div className="chat-messages">
              {/* Messages */}
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
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button className={`chat-send-btn charge-${getChargeLevel()}`}>
                <svg className="send-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
