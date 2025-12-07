// 🔵 PABLO - UI/Styling | 🟣 CRYSTAL - API Logic  
// Friends.jsx - Friends list and requests page

import { useState } from 'react';
import './Friends.scss';

// Helper function to assign color variants to cards
const getColorVariant = (id) => {
  const variants = ['card-cyan', 'card-magenta', 'card-green', 'card-purple', 'card-orange'];
  return variants[id % variants.length];
};

function Friends() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'requests', 'suggestions'

  // Mock data
  const friends = [
    { id: 1, name: 'Colin Weir', username: '@colinw', avatar: 'CW', mutualFriends: 12, status: 'online' },
    { id: 2, name: 'Crystal Ruiz', username: '@crystalr', avatar: 'CR', mutualFriends: 8, status: 'online' },
    { id: 3, name: 'Tito', username: '@tito', avatar: 'T', mutualFriends: 15, status: 'offline' },
    { id: 4, name: 'Natalia P', username: '@nataliap', avatar: 'NP', mutualFriends: 6, status: 'online' },
    { id: 5, name: 'Arthur Bernier', username: '@arthurb', avatar: 'AB', mutualFriends: 4, status: 'offline' },
    { id: 6, name: 'Alex Rivera', username: '@alexr', avatar: 'AR', mutualFriends: 9, status: 'online' },
  ];

  const requests = [
    { id: 101, name: 'Jordan Lee', username: '@jordanl', avatar: 'JL', mutualFriends: 3 },
    { id: 102, name: 'Sam Chen', username: '@samc', avatar: 'SC', mutualFriends: 7 },
  ];

  const suggestions = [
    { id: 201, name: 'Maya Patel', username: '@mayap', avatar: 'MP', mutualFriends: 5 },
    { id: 202, name: 'Jake Thompson', username: '@jaket', avatar: 'JT', mutualFriends: 2 },
    { id: 203, name: 'Emma Wilson', username: '@emmaw', avatar: 'EW', mutualFriends: 8 },
  ];

  return (
    <div className="friends-page">
      {/* Scan line overlay */}
      <div className="scan-overlay"></div>
      
      {/* Header - Centered with stats below */}
      <div className="friends-header">
        <h1 className="friends-title">Friends</h1>
        <div className="friends-stats">
          <span className="stat-item">
            <span className="stat-value">{friends.length}</span>
            <span className="stat-label">connected</span>
          </span>
          <span className="stat-dot"></span>
          <span className="stat-item">
            <span className="stat-value">{requests.length}</span>
            <span className="stat-label">pending</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="friends-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Friends
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {requests.length > 0 && <span className="tab-badge">{requests.length}</span>}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Suggestions
        </button>
      </div>

      {/* Content */}
      <div className="friends-content">
        {activeTab === 'all' && (
          <div className="friends-grid">
            {friends.map(friend => (
              <div key={friend.id} className={`friend-card card card-interactive ${getColorVariant(friend.id)}`}>
                <div className="scan-line"></div>
                <div className="friend-avatar">
                  <span>{friend.avatar}</span>
                  <div className={`status-dot ${friend.status}`}></div>
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{friend.name}</h3>
                  <span className="friend-username">{friend.username}</span>
                  <span className="friend-mutual">{friend.mutualFriends} mutual friends</span>
                </div>
                <button className="friend-action-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="friends-grid">
            {requests.map(request => (
              <div key={request.id} className="friend-card card request-card">
                <div className="scan-line"></div>
                <div className="friend-avatar">
                  <span>{request.avatar}</span>
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{request.name}</h3>
                  <span className="friend-username">{request.username}</span>
                  <span className="friend-mutual">{request.mutualFriends} mutual friends</span>
                </div>
                <div className="request-actions">
                  <button className="btn-accept">Accept</button>
                  <button className="btn-decline">Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="friends-grid">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="friend-card card suggestion-card">
                <div className="scan-line"></div>
                <div className="friend-avatar">
                  <span>{suggestion.avatar}</span>
                </div>
                <div className="friend-info">
                  <h3 className="friend-name">{suggestion.name}</h3>
                  <span className="friend-username">{suggestion.username}</span>
                  <span className="friend-mutual">{suggestion.mutualFriends} mutual friends</span>
                </div>
                <button className="btn-add-friend">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
