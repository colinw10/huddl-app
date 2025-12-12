/**
 * ============================================================================
 * FRIENDS COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Friends/Friends.jsx
 * Assigned to: CRYSTAL
 * 
 * Friends list page with friend management.
 * 
 * TODO:
 * - [ ] Fetch and display friends list
 * - [ ] Show friend requests (pending)
 * - [ ] Accept/reject request actions
 * - [ ] Add friend search functionality
 * - [ ] Handle loading/empty states
 * - [ ] Remove friend action
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import './Friends.scss';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // TODO: Fetch friends list from API
    // TODO: Fetch pending friend requests
  }, []);

  const handleAccept = async (requestId) => {
    // TODO: Call API to accept friend request
  };

  const handleReject = async (requestId) => {
    // TODO: Call API to reject friend request
  };

  return (
    <div className="friends-page">
      {/* TODO: Search input */}
      {/* TODO: Friend requests section */}
      {/* TODO: Friends list section */}
      <p>Friends - Implement me!</p>
    </div>
  );
};

export default Friends;
