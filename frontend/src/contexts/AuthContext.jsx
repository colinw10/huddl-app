/**
 * =============================================================================
 * AUTH CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/AuthContext.jsx
 * Assigned to: PABLO
 * Responsibility: Global authentication state management
 *
 * TODO:
 * - [ ] Store user object and tokens in state
 * - [ ] Provide login function (call /api/auth/login/)
 * - [ ] Provide signup function (call /api/auth/signup/)
 * - [ ] Provide logout function (clear tokens)
 * - [ ] Check auth status on mount (call /api/auth/me/)
 * - [ ] Persist tokens in localStorage
 * - [ ] Export useAuth hook
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // TODO: Uncomment when ready to test
          // const response = await apiClient.get('/auth/me/');
          // setUser(response.data);
          // setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // TODO: Implement login
  const login = async (username, password) => {
    try {
      // const response = await apiClient.post('/auth/login/', { username, password });
      // localStorage.setItem('accessToken', response.data.access);
      // localStorage.setItem('refreshToken', response.data.refresh);
      // 
      // // Fetch user info
      // const userResponse = await apiClient.get('/auth/me/');
      // setUser(userResponse.data);
      // setIsAuthenticated(true);
      // 
      // return { success: true };
      
      console.log('Login not implemented yet');
      return { success: false, error: 'Not implemented' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  // TODO: Implement signup
  const signup = async (username, email, password) => {
    try {
      // const response = await apiClient.post('/auth/signup/', { 
      //   username, 
      //   email, 
      //   password 
      // });
      // 
      // // Auto-login after signup
      // const loginResult = await login(username, password);
      // return loginResult;
      
      console.log('Signup not implemented yet');
      return { success: false, error: 'Not implemented' };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Signup failed' 
      };
    }
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
