/**
 * =============================================================================
 * API CLIENT
 * =============================================================================
 *
 * File: frontend/src/services/apiClient.js
 * Assigned to: PABLO
 * Responsibility: Centralized API client with auth token handling
 *
 * TODO:
 * - [ ] Create axios instance with base URL
 * - [ ] Add request interceptor for auth token
 * - [ ] Add response interceptor for error handling
 * - [ ] Handle 401 errors (redirect to login)
 * - [ ] Handle network errors gracefully
 * - [ ] Export configured instance
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import axios from "axios";

// TODO: Pablo - Move to environment variable
const BASE_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Pablo - Get token from localStorage or context
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: Pablo - Handle 401 (token refresh or redirect to login)
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // TODO: Redirect to login
      // window.location.href = '/login';
    }

    // TODO: Pablo - Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
