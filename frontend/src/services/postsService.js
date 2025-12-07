/**
 * =============================================================================
 * POSTS SERVICE
 * =============================================================================
 *
 * File: frontend/src/services/postsService.js
 * Assigned to: COLIN
 * Responsibility: API calls for posts CRUD
 *
 * TODO:
 * - [ ] Import apiClient
 * - [ ] Implement getAll() - GET /api/posts/
 * - [ ] Implement getById(id) - GET /api/posts/:id/
 * - [ ] Implement create(content) - POST /api/posts/
 * - [ ] Implement update(id, data) - PATCH /api/posts/:id/
 * - [ ] Implement delete(id) - DELETE /api/posts/:id/
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

// TODO: Colin - Import the API client
// import apiClient from "./apiClient";

const postsService = {
  // TODO: Colin - GET /api/posts/ => lists all posts
  getAll: async () => {
    // const response = await apiClient.get('/posts/');
    // return response.data;
    console.log("Colin: Implement getAll()");
    return []; // Placeholder return
  },

  // TODO: Colin - GET /api/posts/:id/ → single post
  getById: async (id) => {
    // const response = await apiClient.get(`/posts/${id}/`);
    // return response.data;
    console.log("Colin: Implement getById()", id);
    return null; // Placeholder return
  },

  // TODO: Colin - POST /api/posts/ → create post
  create: async (content) => {
    // const response = await apiClient.post('/posts/', { content });
    // return response.data;
    console.log("Colin: Implement create()", content);
    return null; // Placeholder return
  },

  // TODO: Colin - PATCH /api/posts/:id/ → update post
  update: async (id, data) => {
    // const response = await apiClient.patch(`/posts/${id}/`, data);
    // return response.data;
    console.log("Colin: Implement update()", id, data);
    return null; // Placeholder return
  },

  // TODO: Colin - DELETE /api/posts/:id/ → delete post
  delete: async (id) => {
    // await apiClient.delete(`/posts/${id}/`);
    console.log("Colin: Implement delete()", id);
  },
};

export default postsService;
