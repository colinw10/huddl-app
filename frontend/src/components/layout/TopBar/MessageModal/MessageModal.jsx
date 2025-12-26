// 🔵 PABLO - UI Architect
// MessageModal.jsx - Full-screen messaging modal with blurred backdrop
//
// This component now:
// 1. Uses MessageContext for state (conversations, messages)
// 2. Clicking a conversation in the sidebar switches the active chat
// 3. Typing and clicking send actually adds messages
// 4. Shows real messages from context state

import { useState, useRef, useEffect } from 'react';
import { useMessages } from '../../../../contexts/MessageContext';
import './MessageModal.scss';

// 🔵 Helper: Format relative time (e.g., "2m", "1h", "3d")
const formatRelativeTime = (date) => {
  if (!date) return '';
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'now';
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return `${diffDays}d`;
};

// 🔵 Helper: Format message timestamp (e.g., "2:30 PM")
const formatMessageTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

// 🔵 Helper: Get initials from display name
const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return name[0];
};

function MessageModal({ onClose }) {
  // 🔵 Get state and actions from context
  const { 
    conversations, 
    selectedConversationId, 
    selectedConversation,
    selectConversation, 
    sendMessage 
  } = useMessages();
  
  // 🔵 Local state for the text input
  const [messageText, setMessageText] = useState('');
  
  // 🔵 Local state for search filtering
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🔵 Mobile view state - 'list' shows conversations, 'chat' shows the chat
  const [mobileView, setMobileView] = useState('list');
  
  // 🔵 Fullscreen mode state
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // 🔵 Ref for scrolling to bottom of messages
  const messagesEndRef = useRef(null);
  
  // 🔵 Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation?.messages]);
  
  // 🔵 Calculate charge level (0-4) based on message length
  // This creates the "charging up" visual effect on the send button
  const getChargeLevel = () => {
    const len = messageText.length;
    if (len === 0) return 0;
    if (len < 10) return 1;
    if (len < 30) return 2;
    if (len < 60) return 3;
    return 4; // Fully charged
  };
  
  // 🔵 Handle sending a message
  const handleSend = () => {
    if (!messageText.trim()) return;
    
    // Call context function to add message
    sendMessage(messageText);
    
    // Clear the input
    setMessageText('');
  };
  
  // 🔵 Handle Enter key to send (Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // 🔵 Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Match by display name
    if (conv.user.displayName?.toLowerCase().includes(query)) return true;
    
    // Match by username
    if (conv.user.username?.toLowerCase().includes(query)) return true;
    
    // Match by message content
    const hasMatchingMessage = conv.messages?.some(msg => 
      msg.text?.toLowerCase().includes(query)
    );
    if (hasMatchingMessage) return true;
    
    return false;
  });
  
  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className={`message-modal ${isFullscreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="message-modal-header">
          <h2 className="message-modal-title">Messages</h2>
          <div className="modal-header-actions">
            <button 
              className="fullscreen-btn" 
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 14 10 14 10 20"/>
                  <polyline points="20 10 14 10 14 4"/>
                  <line x1="14" y1="10" x2="21" y2="3"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9"/>
                  <polyline points="9 21 3 21 3 15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              )}
            </button>
            <button className="close-btn-glow" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body - Two column layout */}
        <div className="message-modal-body">
          {/* Left: Conversations List */}
          <div className={`message-conversations ${mobileView === 'list' ? 'show' : ''}`}>
            <div className="conversations-header">
              <div className="conversations-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="conversations-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchQuery('');
                  }}
                />
                {searchQuery && (
                  <button 
                    className="conversations-search-clear"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="conversations-list">
              {/* 🔵 Map through filtered conversations from context */}
              {filteredConversations.map((conv) => {
                const lastMessage = conv.messages[conv.messages.length - 1];
                const isActive = conv.id === selectedConversationId;
                
                return (
                  <div 
                    key={conv.id}
                    className={`conversation-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      selectConversation(conv.id);
                      setMobileView('chat'); // Switch to chat view on mobile
                    }}
                  >
                    {/* Avatar - show initials */}
                    <div className="conversation-avatar">
                      <span className="initial-1">{getInitials(conv.user.displayName)[0]}</span>
                      {getInitials(conv.user.displayName).length > 1 && (
                        <span className="initial-2">{getInitials(conv.user.displayName)[1]}</span>
                      )}
                    </div>
                    <div className="conversation-info">
                      <span className="conversation-name">{conv.user.displayName}</span>
                      <span className="conversation-preview">
                        {lastMessage ? lastMessage.text.substring(0, 30) + (lastMessage.text.length > 30 ? '...' : '') : 'No messages yet'}
                      </span>
                    </div>
                    <span className="conversation-time">
                      {formatRelativeTime(conv.lastMessageTime)}
                    </span>
                  </div>
                );
              })}
              
              {/* Empty state - no search results */}
              {filteredConversations.length === 0 && searchQuery.trim() && (
                <div className="conversations-empty">
                  <p>No results for "{searchQuery}"</p>
                  <p className="empty-hint">Try a different search term</p>
                </div>
              )}
              
              {/* Empty state - no conversations at all */}
              {conversations.length === 0 && (
                <div className="conversations-empty">
                  <p>No conversations yet</p>
                  <p className="empty-hint">Message someone from their post!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Chat View */}
          <div className={`message-chat ${mobileView === 'list' ? 'hide' : ''}`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  {/* Mobile back button */}
                  <button 
                    className="chat-back-btn"
                    onClick={() => setMobileView('list')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <div className="chat-user-info">
                    <div className="chat-avatar">
                      <span className="initial-1">{getInitials(selectedConversation.user.displayName)[0]}</span>
                      {getInitials(selectedConversation.user.displayName).length > 1 && (
                        <span className="initial-2">{getInitials(selectedConversation.user.displayName)[1]}</span>
                      )}
                    </div>
                    <span className="chat-username">{selectedConversation.user.displayName}</span>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="chat-messages">
                  {selectedConversation.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}
                    >
                      <p>{msg.text}</p>
                      <span className="message-time">{formatMessageTime(msg.timestamp)}</span>
                    </div>
                  ))}
                  
                  {/* Empty conversation state */}
                  {selectedConversation.messages.length === 0 && (
                    <div className="chat-empty">
                      <p>Start a conversation with {selectedConversation.user.displayName}</p>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Composer */}
                <div className="chat-composer">
                  <textarea 
                    placeholder="Type a message..." 
                    className="chat-textarea"
                    rows="1"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button 
                    className={`chat-send-btn charge-${getChargeLevel()}`}
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                  >
                    <svg className="send-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"/>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              /* No conversation selected state */
              <div className="chat-no-selection">
                <div className="no-selection-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.4)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <p>Select a conversation</p>
                <p className="no-selection-hint">or message someone from their post</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageModal;
