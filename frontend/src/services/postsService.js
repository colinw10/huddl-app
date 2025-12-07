/**
 * =============================================================================
 * POSTS SERVICE
 * =============================================================================
 * 
 * File: frontend/src/services/postsService.js
 * Assigned to: COLIN
 * Responsibility: API calls for posts CRUD
 * 
 * Status: IMPLEMENTED ✅
 * =============================================================================
 */
import apiClient from "./apiClient"; // Axios instance with JWT interceptors

const postsService = {
  // GET /api/posts/ => lists all posts
  getAll: async () => {
    const response = await apiClient.get('/posts/'); // Sends GET, token added automatically
    return response.data; // Return just the JSON array, not full axios response
  },
  // GET /api/posts/:id/ → single post
  getById: async (id) => {
    const response = await apiClient.get(`/posts/${id}/`)// Template literal inserts id into URL
    return response.data;
    
  },
  // POST /api/posts/ → create post
  create: async (content) => {
     // { content } is shorthand for { content: content } - becomes JSON body
     const response = await apiClient.post('/posts/', { content });
     return response.data;
     // Returns the new post object with id, author, timestamps

  },
 // PATCH /api/posts/:id/ → update post (partial update, not full replace)
 update: async (id, data) => {
   // data is an object like { content: "edited text" }
   const response = await apiClient.patch(`/posts/${id}/`, data);
   return response.data; // Returns updated post
 },
// DELETE /api/posts/:id/ → delete post
delete: async (id) => {
  await apiClient.delete(`/posts/${id}/`); // No return - DELETE gives 204 No Content
},

};

export default postsService;
  
 