/**
 * =============================================================================
 * POSTS SERVICE
 * =============================================================================
 *
 * File: frontend/src/services/postsService.js
 * Assigned to: COLIN 🟢
 * Responsibility: API calls for posts CRUD operations
 *
 * WHAT THIS FILE DOES:
 * - Provides functions to interact with the /posts/ API endpoints
 * - Used by PostsContext to fetch/create/update/delete posts
 *
 * ENDPOINTS (from backend):
 * - GET    /posts/           → list all posts
 * - POST   /posts/           → create new post
 * - GET    /posts/:id/       → get single post
 * - PUT    /posts/:id/       → update post
 * - DELETE /posts/:id/       → delete post
 * - GET    /posts/:id/replies/  → get replies to a post
 * - POST   /posts/:id/replies/  → create reply to a post
 *
 * TODO:
 * 1. Import apiClient from './apiClient'
 * 2. Implement each function using apiClient.get(), .post(), .put(), .delete()
 * 3. Return response.data from each function
 *
 * EXAMPLE (for reference):
 *   const getAll = async () => {
 *     const response = await apiClient.get('/posts/');
 *     return response.data;
 *   };
 *
 * =============================================================================
 */

// TODO: Import apiClient

const postsService = {
  // TODO: Get all posts
  getAll: async () => {
    // GET /posts/
  },

  // TODO: Get single post by ID
  getById: async (id) => {
    // GET /posts/${id}/
  },

  // TODO: Create new post
  // data should be: { content: "post text" }
  create: async (data) => {
    // POST /posts/
  },

  // TODO: Update existing post
  update: async (id, data) => {
    // PUT /posts/${id}/
  },

  // TODO: Delete post
  delete: async (id) => {
    // DELETE /posts/${id}/
  },

  // TODO: Get replies to a post
  getReplies: async (postId) => {
    // GET /posts/${postId}/replies/
  },

  // TODO: Create reply to a post
  // data should be: { content: "reply text" }
  createReply: async (postId, data) => {
    // POST /posts/${postId}/replies/
  },
};

export default postsService;
