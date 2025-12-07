/**
 * =============================================================================
 * API CLIENT
 * =============================================================================
 *
 * File: frontend/src/services/apiClient.js
 * Assigned to: TITO
 * Responsibility: Axios instance with JWT auth interceptors
 *
 * TODO:
 * - [ ] Install axios: npm install axios
 * - [ ] Create axios instance with baseURL
 * - [ ] Add request interceptor to attach JWT token
 * - [ ] Add response interceptor to handle 401 errors
 * - [ ] Handle token refresh if needed
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

// TODO: Tito - Import axios
// import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api";

// TODO: Tito - Create axios instance
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// TODO: Tito - Add request interceptor to attach token
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// TODO: Tito - Add response interceptor for 401 handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('access_token');
//       localStorage.removeItem('refresh_token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// Placeholder - replace with axios instance
const apiClient = {
  get: async (url) => {
    console.log("Tito: Implement apiClient.get()", url);
    return { data: [] };
  },
  post: async (url, data) => {
    console.log("Tito: Implement apiClient.post()", url, data);
    return { data: null };
  },
  patch: async (url, data) => {
    console.log("Tito: Implement apiClient.patch()", url, data);
    return { data: null };
  },
  delete: async (url) => {
    console.log("Tito: Implement apiClient.delete()", url);
    return { data: null };
  },
};

export default apiClient;
