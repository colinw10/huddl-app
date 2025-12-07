/**
 * =============================================================================
 * AUTH CONTEXT
 * =============================================================================
 * 
 * File: frontend/src/contexts/AuthContext.jsx
 * Assigned to: NATALIA
 * Responsibility: Authentication state management
 * 
 * TODO:
 * - [ ] Implement login(username, password) - POST /api/auth/login/
 * - [ ] Implement signup(username, email, password) - POST /api/auth/signup/
 * - [ ] Implement logout() - clear tokens and user
 * - [ ] Implement checkAuth() - verify token on mount
 * - [ ] Store tokens in localStorage
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api/auth';

// Create the context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // State for auth
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // TODO: Natalia - Implement checkAuth
  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    
    try {
      // TODO: Natalia - Fetch current user from /api/auth/me/
      // const response = await fetch(`${API_URL}/me/`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // if (response.ok) {
      //   const userData = await response.json();
      //   setUser(userData);
      // }
      console.log('Natalia: Implement checkAuth()');
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Natalia - Implement login
  const login = async (username, password) => {
    setError(null);
    try {
      // TODO: Natalia - POST to /api/auth/login/
      // const response = await fetch(`${API_URL}/login/`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   localStorage.setItem('access_token', data.access);
      //   localStorage.setItem('refresh_token', data.refresh);
      //   setUser(data.user);
      //   return { success: true };
      // }
      console.log('Natalia: Implement login()', username);
      return { success: false, error: 'Not implemented' };
    } catch (err) {
      return { success: false, error: 'Login failed' };
    }
  };

  // TODO: Natalia - Implement signup
  const signup = async (username, email, password) => {
    setError(null);
    try {
      // TODO: Natalia - POST to /api/auth/signup/
      // const response = await fetch(`${API_URL}/signup/`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password })
      // });
      // const data = await response.json();
      // if (response.ok) {
      //   return { success: true };
      // }
      console.log('Natalia: Implement signup()', username, email);
      return { success: false, error: 'Not implemented' };
    } catch (err) {
      return { success: false, error: 'Signup failed' };
    }
  };

  // TODO: Natalia - Implement logout
  const logout = () => {
    // TODO: Natalia - Clear tokens and user
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('refresh_token');
    // setUser(null);
    console.log('Natalia: Implement logout()');
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
