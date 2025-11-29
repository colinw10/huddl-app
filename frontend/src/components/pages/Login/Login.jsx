/**
 * =============================================================================
 * LOGIN PAGE - User Authentication
 * =============================================================================
 * 
 * File: frontend/src/components/pages/Login/Login.jsx
 * Assigned to: NATALIA
 * Responsibility: Login form, authentication, JWT token handling
 * 
 * TODO:
 * - [ ] Create login form with email/username and password fields
 * - [ ] Add form validation (required fields, email format)
 * - [ ] Add useState for form data, loading, errors
 * - [ ] Create handleSubmit to call auth API
 * - [ ] POST to /api/users/login/ with credentials
 * - [ ] On success: save JWT token to localStorage, redirect to /home
 * - [ ] On error: display error message from API
 * - [ ] Add "Forgot Password?" link (stretch goal)
 * - [ ] Add "Don't have an account? Sign up" link to /signup
 * - [ ] Add loading state while authenticating
 * 
 * API Endpoint: POST /api/users/login/
 * Request: { email, password }
 * Response: { access, refresh, user: { id, username, email } }
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';

function Login() {
  // TODO: Natalia - Add state
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    // TODO: Natalia - Update form state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Natalia - Implement login logic
    // 1. setLoading(true)
    // 2. POST to /api/users/login/
    // 3. Save token to localStorage
    // 4. navigate('/home')
    console.log('Natalia: Implement login submit');
  };
  
  return (
    <div className="login-page">
      <h1>Login</h1>
      <p>Natalia: Build the login form</p>
      
      <form onSubmit={handleSubmit}>
        {/* TODO: Email input */}
        {/* TODO: Password input */}
        {/* TODO: Submit button */}
        {/* TODO: Error display */}
        {/* TODO: Link to signup */}
      </form>
    </div>
  );
}

export default Login;