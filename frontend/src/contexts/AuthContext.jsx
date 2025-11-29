/**
 * =============================================================================
 * AUTH CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/AuthContext.jsx
 * Assigned to: PABLO (context structure) + NATALIA (auth logic)
 * Responsibility: Global authentication state management
 *
 * TODO:
 * - [ ] Create AuthContext with Provider
 * - [ ] Store user and tokens in state
 * - [ ] Provide login, logout, signup functions
 * - [ ] Check auth status on mount
 * - [ ] Handle token refresh
 * - [ ] Export useAuth hook
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // TODO: Natalia - Implement /auth/me endpoint call
          // const response = await apiClient.get('/auth/me/');
          // setUser(response.data);
          // setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // TODO: Natalia - Implement login function
  const login = async (email, password) => {
    // const response = await apiClient.post('/auth/login/', { email, password });
    // localStorage.setItem('accessToken', response.data.access);
    // localStorage.setItem('refreshToken', response.data.refresh);
    // setUser(response.data.user);
    // setIsAuthenticated(true);
    console.log('Login not implemented');
  };

  // TODO: Natalia - Implement signup function
  const signup = async (username, email, password) => {
    // const response = await apiClient.post('/auth/signup/', { username, email, password });
    // localStorage.setItem('accessToken', response.data.access);
    // localStorage.setItem('refreshToken', response.data.refresh);
    // setUser(response.data.user);
    // setIsAuthenticated(true);
    console.log('Signup not implemented');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    setIsAuthenticated(false);
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
