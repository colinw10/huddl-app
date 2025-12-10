/**
 * =============================================================================
 * FRIENDS PAGE
 * =============================================================================
 *
 * 🔵 PABLO - UI/Styling ✅ DONE
 * 🟣 CRYSTAL - Friends Logic & Context Integration ❌ TODO
 *
 * WHAT CRYSTAL NEEDS TO DO:
 * 1. Import useFriends from contexts
 * 2. Get friends data and functions from useFriends()
 * 3. Implement loadFriends useEffect to fetch friends on mount
 * 4. Implement handleAcceptRequest to accept friend requests
 * 5. Implement handleDeclineRequest to decline friend requests
 * 6. Implement handleRemoveFriend to remove a friend
 * 7. Replace mock data with real context data
 *
 * =============================================================================
 */

import { useState, useEffect } from 'react';
// TODO: CRYSTAL - Import useFriends
// import { useFriends } from '../../../contexts/FriendsContext';
import './Friends.scss';

function Friends() {
  // TODO: CRYSTAL - Get friends data and functions from useFriends
  // const { 
  //   friends, 
  //   pendingRequests, 
  //   loadFriends, 
  //   acceptRequest, 
  //   declineRequest,
  //   removeFriend,
  //   loading,
  //   error 
  // } = useFriends();
  
  // Placeholder state - REMOVE when implementing with real context
  const [activeTab, setActiveTab] = useState('friends');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // TODO: CRYSTAL - Replace these with real context data
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // TODO: CRYSTAL - Implement useEffect to load friends on mount
  useEffect(() => {
    // CRYSTAL: Call loadFriends() here when FriendsContext is ready
    // loadFriends();
    
    console.log('CRYSTAL: Implement loadFriends call here');
    
    // Placeholder mock data - REMOVE when implementing
    setFriends([
      { id: 1, username: 'MockFriend1', email: 'mock1@test.com' },
      { id: 2, username: 'MockFriend2', email: 'mock2@test.com' },
    ]);
    setPendingRequests([
      { id: 1, from_user: { id: 3, username: 'PendingUser', email: 'pending@test.com' } }
    ]);
  }, []);

  // TODO: CRYSTAL - Implement accept request handler
  const handleAcceptRequest = async (requestId) => {
    // CRYSTAL: Call acceptRequest(requestId) from context
    // const result = await acceptRequest(requestId);
    // if (!result.success) { handle error }
    
    console.log('CRYSTAL: Implement acceptRequest for request:', requestId);
    alert('Accept request not implemented - CRYSTAL TODO');
  };

  // TODO: CRYSTAL - Implement decline request handler
  const handleDeclineRequest = async (requestId) => {
    // CRYSTAL: Call declineRequest(requestId) from context
    // const result = await declineRequest(requestId);
    // if (!result.success) { handle error }
    
    console.log('CRYSTAL: Implement declineRequest for request:', requestId);
    alert('Decline request not implemented - CRYSTAL TODO');
  };

  // TODO: CRYSTAL - Implement remove friend handler
  const handleRemoveFriend = async (friendId) => {
    // CRYSTAL: Call removeFriend(friendId) from context
    // const result = await removeFriend(friendId);
    // if (!result.success) { handle error }
    
    console.log('CRYSTAL: Implement removeFriend for friend:', friendId);
    alert('Remove friend not implemented - CRYSTAL TODO');
  };

  // ========== JSX - STYLING DONE BY PABLO ==========
  return (
    <div className="friends-page">
      <div className="friends-header">
        <h1 className="friends-title">Friends</h1>
        <p className="friends-subtitle">
          {activeTab === 'friends' 
            ? `You have ${friends.length} friends` 
            : `${pendingRequests.length} pending requests`}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="friends-tabs">
        <button 
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          <span className="tab-icon">👥</span>
          My Friends
          <span className="tab-count">{friends.length}</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <span className="tab-icon">��</span>
          Requests
          {pendingRequests.length > 0 && (
            <span className="tab-count pending">{pendingRequests.length}</span>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="friends-error">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="friends-loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="friends-content">
          {/* Friends List */}
          {activeTab === 'friends' && (
            <div className="friends-list">
              {friends.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">👋</span>
                  <h3>No friends yet</h3>
                  <p>Start connecting with people!</p>
                </div>
              ) : (
                friends.map(friend => (
                  <div key={friend.id} className="friend-card">
                    <div className="friend-avatar">
                      {friend.username?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="friend-info">
                      <h4 className="friend-name">{friend.username}</h4>
                      <p className="friend-email">{friend.email}</p>
                    </div>
                    <div className="friend-actions">
                      <button 
                        className="btn-action btn-message"
                        title="Message"
                      >
                        💬
                      </button>
                      <button 
                        className="btn-action btn-remove"
                        onClick={() => handleRemoveFriend(friend.id)}
                        title="Remove friend"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Pending Requests */}
          {activeTab === 'requests' && (
            <div className="requests-list">
              {pendingRequests.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📭</span>
                  <h3>No pending requests</h3>
                  <p>You're all caught up!</p>
                </div>
              ) : (
                pendingRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-avatar">
                      {request.from_user?.username?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="request-info">
                      <h4 className="request-name">{request.from_user?.username}</h4>
                      <p className="request-email">{request.from_user?.email}</p>
                    </div>
                    <div className="request-actions">
                      <button 
                        className="btn-accept"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        ✓ Accept
                      </button>
                      <button 
                        className="btn-decline"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        ✕ Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Friends;
