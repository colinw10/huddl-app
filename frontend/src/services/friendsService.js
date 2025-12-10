/**
 * =============================================================================
 * FRIENDS SERVICE
 * =============================================================================
 *
 * File: frontend/src/services/friendsService.js
 * Assigned to: CRYSTAL 🟣
 * Responsibility: API calls for friends/requests operations
 *
 * WHAT THIS FILE DOES:
 * - Provides functions to interact with the /friends/ API endpoints
 * - Used by FriendsContext to manage friend list and requests
 *
 * ENDPOINTS (from backend):
 * - GET    /friends/                    → get friend list
 * - GET    /friends/pending/            → get pending friend requests
 * - POST   /friends/request/            → send friend request (body: { to_user_id })
 * - POST   /friends/accept/:requestId/  → accept friend request
 * - POST   /friends/decline/:requestId/ → decline friend request
 * - DELETE /friends/remove/:userId/     → remove friend
 *
 * TODO:
 * 1. Import apiClient from './apiClient'
 * 2. Implement each function using apiClient
 * 3. Return response.data from each function
 *
 * =============================================================================
 */

// TODO: Import apiClient

const friendsService = {
  // TODO: Get all friends for current user
  getAll: async () => {
    // GET /friends/
  },

  // TODO: Get pending friend requests
  getPendingRequests: async () => {
    // GET /friends/pending/
  },

  // TODO: Send friend request to another user
  // Need to send: { to_user_id: userId }
  sendRequest: async (userId) => {
    // POST /friends/request/
  },

  // TODO: Accept a friend request
  acceptRequest: async (requestId) => {
    // POST /friends/accept/${requestId}/
  },

  // TODO: Decline a friend request
  declineRequest: async (requestId) => {
    // POST /friends/decline/${requestId}/
  },

  // TODO: Remove a friend
  remove: async (userId) => {
    // DELETE /friends/remove/${userId}/
  },
};

export default friendsService;
