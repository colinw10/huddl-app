/**
 * =============================================================================
 * FRIENDS SERVICE
 * =============================================================================
 *
 * File: frontend/src/services/friendsService.js
 * Assigned to: CRYSTAL
 * Responsibility: API calls for friends/connections
 *
 * TODO:
 * - [ ] Import apiClient
 * - [ ] Implement getAll() - GET /api/friends/
 * - [ ] Implement getRequests() - GET /api/friends/requests/
 * - [ ] Implement sendRequest(userId) - POST /api/friends/request/
 * - [ ] Implement acceptRequest(requestId) - POST /api/friends/accept/:id/
 * - [ ] Implement declineRequest(requestId) - POST /api/friends/decline/:id/
 * - [ ] Implement removeFriend(friendshipId) - DELETE /api/friends/:id/
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

// TODO: Crystal - Import the API client
// import apiClient from "./apiClient";

const friendsService = {
  // TODO: Crystal - GET /api/friends/ => list user's friends
  getAll: async () => {
    // const response = await apiClient.get('/friends/');
    // return response.data;
    console.log("Crystal: Implement getAll()");
    return []; // Placeholder return
  },

  // TODO: Crystal - GET /api/friends/requests/ => pending friend requests
  getRequests: async () => {
    // const response = await apiClient.get('/friends/requests/');
    // return response.data;
    console.log("Crystal: Implement getRequests()");
    return []; // Placeholder return
  },

  // TODO: Crystal - POST /api/friends/request/ → send friend request
  sendRequest: async (userId) => {
    // const response = await apiClient.post('/friends/request/', { user_id: userId });
    // return response.data;
    console.log("Crystal: Implement sendRequest()", userId);
    return null; // Placeholder return
  },

  // TODO: Crystal - POST /api/friends/accept/:id/ → accept request
  acceptRequest: async (requestId) => {
    // const response = await apiClient.post(`/friends/accept/${requestId}/`);
    // return response.data;
    console.log("Crystal: Implement acceptRequest()", requestId);
    return null; // Placeholder return
  },

  // TODO: Crystal - POST /api/friends/decline/:id/ → decline request
  declineRequest: async (requestId) => {
    // const response = await apiClient.post(`/friends/decline/${requestId}/`);
    // return response.data;
    console.log("Crystal: Implement declineRequest()", requestId);
    return null; // Placeholder return
  },

  // TODO: Crystal - DELETE /api/friends/:id/ → remove friend
  removeFriend: async (friendshipId) => {
    // await apiClient.delete(`/friends/${friendshipId}/`);
    console.log("Crystal: Implement removeFriend()", friendshipId);
  },
};

export default friendsService;
