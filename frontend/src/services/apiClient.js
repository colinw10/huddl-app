/**
 * =============================================================================
 * API CLIENT
 * =============================================================================
 *
 * File: frontend/src/services/apiClient.js
 * Assigned to: TITO 🟠
 * Responsibility: Axios instance with auth headers & token refresh
 *
 * WHAT THIS FILE DOES:
 * - Creates a configured axios instance that ALL other services use
 * - Automatically attaches JWT token to every request
 * - Handles token refresh when access token expires
 *
 * TODO:
 * 1. Create axios instance with baseURL 'http://localhost:8000/api'
 * 2. Add request interceptor to attach Authorization header
 * 3. Add response interceptor to handle 401 errors & refresh token
 *
 * RESOURCES:
 * - Axios interceptors: https://axios-http.com/docs/interceptors
 * - JWT flow: access token expires → use refresh token → get new access token
 *
 * =============================================================================
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'\;

// TODO: Create axios instance
const apiClient = axios.create({
  // Set baseURL and headers here
});

// TODO: Request interceptor
// Before every request, check localStorage for 'access_token'
// If it exists, add it to headers: Authorization: `Bearer ${token}`
apiClient.interceptors.request.use(
  (config) => {
    // Your code here
    return config;
  },
  (error) => Promise.reject(error)
);

// TODO: Response interceptor  
// If response status is 401 (unauthorized):
//   1. Try to refresh using the 'refresh_token' from localStorage
//   2. POST to /auth/token/refresh/ with { refresh: refreshToken }
//   3. If success, save new access token & retry original request
//   4. If refresh fails, clear tokens & redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Your code here - this is the tricky part!
    // Hint: You'll need to check error.response?.status === 401
    // Hint: Use error.config to retry the original request
    return Promise.reject(error);
  }
);

export default apiClient;
