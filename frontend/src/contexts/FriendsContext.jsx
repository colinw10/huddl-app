/**
 * =============================================================================
 * FRIENDS CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/FriendsContext.jsx
 * Assigned to: CRYSTAL 🟣
 * Responsibility: Friends & friend requests state management
 *
 * WHAT THIS FILE DOES:
 * - Stores friends list and pending requests in React state
 * - Provides functions to send/accept/decline requests, remove friends
 * - Makes friends state available via useFriends() hook
 *
 * TODO:
 * 1. Import friendsService
 * 2. Implement fetchFriends() - get friends AND pending requests
 * 3. Implement sendRequest(userId) - send friend request
 * 4. Implement acceptRequest(requestId) - accept & add to friends
 * 5. Implement declineRequest(requestId) - decline & remove from pending
 * 6. Implement removeFriend(userId) - unfriend
 *
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: import friendsService from '../services/friendsService';
import { useAuth } from './AuthContext';

const FriendsContext = createContext(null);

export const FriendsProvider = ({ children }) => {
  const { user, isLoading: authLoading } = useAuth();

  // STATE - provided for you
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch when user logs in
  useEffect(() => {
    if (authLoading) return;
    if (user) {
      fetchFriends();
    } else {
      setFriends([]);
      setPendingRequests([]);
    }
  }, [user, authLoading]);

  // TODO: Implement fetchFriends
  const fetchFriends = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Call friendsService.getAll() - set to friends state
      // 2. Call friendsService.getPendingRequests() - set to pendingRequests state
      // Hint: You can use Promise.all() to do both at once
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch friends');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Implement sendRequest
  const sendRequest = async (userId) => {
    try {
      // Call friendsService.sendRequest(userId)
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to send' };
    }
  };

  // TODO: Implement acceptRequest
  const acceptRequest = async (requestId) => {
    try {
      // 1. Call friendsService.acceptRequest(requestId)
      // 2. Add the new friend to friends state
      // 3. Remove from pendingRequests state
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to accept' };
    }
  };

  // TODO: Implement declineRequest
  const declineRequest = async (requestId) => {
    try {
      // 1. Call friendsService.declineRequest(requestId)
      // 2. Remove from pendingRequests state
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to decline' };
    }
  };

  // TODO: Implement removeFriend
  const removeFriend = async (userId) => {
    try {
      // 1. Call friendsService.remove(userId)
      // 2. Remove from friends state
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to remove' };
    }
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        pendingRequests,
        isLoading,
        error,
        fetchFriends,
        sendRequest,
        acceptRequest,
        declineRequest,
        removeFriend,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};

export default FriendsContext;
