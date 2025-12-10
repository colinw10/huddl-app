/**
 * =============================================================================
 * AUTH CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/AuthContext.jsx
 * Assigned to: NATALIA 🟡
 * Responsibility: Authentication state & functions
 *
 * WHAT THIS FILE DOES:
 * - Stores current user in React state
 * - Provides login(), signup(), logout() functions
 * - Checks if user is authenticated on app load
 * - Makes auth state available via useAuth() hook
 *
 * BACKEND ENDPOINTS (already built):
 * - POST /auth/signup/         → create account (body: { username, email, password })
 * - POST /auth/login/          → login with email (body: { email, password })
 * - POST /auth/token/refresh/  → refresh access token (body: { refresh })
 * - GET  /auth/me/             → get current user info
 *
 * TOKEN STORAGE:
 * - Store 'access_token' and 'refresh_token' in localStorage
 * - Access token goes in Authorization header (handled by apiClient)
 *
 * TODO:
 * 1. Import apiClient (or use axios directly for auth endpoints)
 * 2. Implement login() - POST to /auth/login/, store tokens, fetch user
 * 3. Implement signup() - POST to /auth/signup/, then login
 * 4. Implement logout() - clear tokens & user state
 * 5. Implement checkAuth() - verify token on app load
 *
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'\;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // STATE - provided for you
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // TODO: Implement checkAuth
  // Called on app load to restore session
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        // No token = not logged in
        setIsLoading(false);
        return;
      }
      // 1. Call GET /auth/me/ with Authorization header
      // 2. If success, setUser() and setIsAuthenticated(true)
      // 3. If 401, tokens are expired - clear them
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Implement login
  const login = async (email, password) => {
    try {
      // 1. POST to /auth/login/ with { email, password }
      // 2. Response contains { access, refresh, user }
      // 3. Store tokens in localStorage
      // 4. setUser() and setIsAuthenticated(true)
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.detail || 'Login failed' 
      };
    }
  };

  // TODO: Implement signup
  const signup = async (username, email, password) => {
    try {
      // 1. POST to /auth/signup/ with { username, email, password }
      // 2. If success, call login() to log them in
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.detail || 'Signup failed' 
      };
    }
  };

  // TODO: Implement logout
  const logout = () => {
    // 1. Remove tokens from localStorage
    // 2. setUser(null)
    // 3. setIsAuthenticated(false)
  };

  // Optional: updateProfile
  const updateProfile = async (data) => {
    // For later - update user profile
    return { success: false, error: 'Not implemented' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        checkAuth,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
