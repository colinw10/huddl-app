/**
 * =============================================================================
 * FRIENDS CONTEXT
 * =============================================================================
 * 
 * File: frontend/src/contexts/FriendsContext.jsx
 * Assigned to: CRYSTAL
 * Responsibility: Global friends state management
 * 
 * TODO:
 * - [ ] Import friendsService
 * - [ ] Implement fetchFriends() - load friends list
 * - [ ] Implement fetchRequests() - load pending requests
 * - [ ] Implement sendRequest(userId) - send friend request
 * - [ ] Implement acceptRequest(requestId) - accept request
 * - [ ] Implement declineRequest(requestId) - decline request
 * - [ ] Implement removeFriend(friendshipId) - remove friend
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: Crystal - Import your friends service
// import friendsService from '../services/friendsService';
import { useAuth } from './AuthContext';

// Create the context
const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  const { user } = useAuth();
  
  // State for friends and requests
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch friends when user logs in
  useEffect(() => {
    if (user) {
      fetchFriends();
      fetchRequests();
    } else {
      setFriends([]);
      setRequests([]);
    }
  }, [user]);

  // TODO: Crystal - Implement fetchFriends
  const fetchFriends = async () => {
    setIsLoading(true);
    try {
      // const data = await friendsService.getAll();
      // setFriends(data);
      console.log('Crystal: Implement fetchFriends()');
    } catch (err) {
      setError('Failed to fetch friends');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Crystal - Implement fetchRequests
  const fetchRequests = async () => {
    try {
      // const data = await friendsService.getRequests();
      // setRequests(data);
      console.log('Crystal: Implement fetchRequests()');
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  // TODO: Crystal - Implement sendRequest
  const sendRequest = async (userId) => {
    try {
      // await friendsService.sendRequest(userId);
      console.log('Crystal: Implement sendRequest()', userId);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to send request' };
    }
  };

  // TODO: Crystal - Implement acceptRequest
  const acceptRequest = async (requestId) => {
    try {
      // const newFriend = await friendsService.acceptRequest(requestId);
      // setRequests(prev => prev.filter(r => r.id !== requestId));
      // setFriends(prev => [...prev, newFriend]);
      console.log('Crystal: Implement acceptRequest()', requestId);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to accept request' };
    }
  };

  // TODO: Crystal - Implement declineRequest
  const declineRequest = async (requestId) => {
    try {
      // await friendsService.declineRequest(requestId);
      // setRequests(prev => prev.filter(r => r.id !== requestId));
      console.log('Crystal: Implement declineRequest()', requestId);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to decline request' };
    }
  };

  // TODO: Crystal - Implement removeFriend
  const removeFriend = async (friendshipId) => {
    try {
      // await friendsService.removeFriend(friendshipId);
      // setFriends(prev => prev.filter(f => f.id !== friendshipId));
      console.log('Crystal: Implement removeFriend()', friendshipId);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to remove friend' };
    }
  };

  const value = {
    friends,
    requests,
    isLoading,
    error,
    fetchFriends,
    fetchRequests,
    sendRequest,
    acceptRequest,
    declineRequest,
    removeFriend,
  };

  return (
    <FriendsContext.Provider value={value}>
      {children}
    </FriendsContext.Provider>
  );
};

// Hook for easy access
export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};

export default FriendsContext;
