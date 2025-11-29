/**
 * =============================================================================
 * FRIENDS PAGE - Friends List & Requests
 * =============================================================================
 * 
 * File: frontend/src/components/pages/Friends/Friends.jsx
 * Assigned to: CRYSTAL
 * Responsibility: Friends list, friend requests, search, add/remove friends
 * 
 * TODO:
 * - [ ] Fetch friends list from /api/friends/
 * - [ ] Fetch pending friend requests from /api/friends/requests/
 * - [ ] Display friends in grid/list (avatar, name, status)
 * - [ ] Display friend requests with accept/decline buttons
 * - [ ] Add search functionality to find users
 * - [ ] Add "Send Friend Request" button
 * - [ ] Add "Remove Friend" functionality
 * - [ ] Handle loading and error states
 * - [ ] Add empty states (no friends, no requests)
 * 
 * API Endpoints:
 * - GET /api/friends/ - List friends
 * - GET /api/friends/requests/ - Pending requests
 * - POST /api/friends/request/ - Send request
 * - POST /api/friends/accept/{id}/ - Accept request
 * - DELETE /api/friends/{id}/ - Remove friend
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { useState, useEffect } from 'react';
import './Friends.scss';

function Friends() {
  // TODO: Crystal - Add state
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // TODO: Crystal - Fetch friends and requests
    console.log('Crystal: Implement friends data fetching');
  }, []);
  
  const handleAcceptRequest = (requestId) => {
    // TODO: Crystal - Accept friend request
    console.log('Crystal: Implement accept request');
  };
  
  const handleDeclineRequest = (requestId) => {
    // TODO: Crystal - Decline friend request
    console.log('Crystal: Implement decline request');
  };
  
  const handleRemoveFriend = (friendId) => {
    // TODO: Crystal - Remove friend
    console.log('Crystal: Implement remove friend');
  };
  
  return (
    <div className="friends-page">
      <h1>Friends</h1>
      <p>Crystal: Build the friends page</p>
      
      {/* TODO: Search bar */}
      {/* TODO: Friend requests section */}
      {/* TODO: Friends list */}
    </div>
  );
}

export default Friends;
