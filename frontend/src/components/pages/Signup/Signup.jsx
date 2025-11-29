/**
 * =============================================================================
 * SIGNUP PAGE - User Registration
 * =============================================================================
 * 
 * File: frontend/src/components/pages/Signup/Signup.jsx
 * Assigned to: NATALIA
 * Responsibility: Registration form, account creation, validation
 * 
 * TODO:
 * - [ ] Create signup form with fields:
 *       - username (required, unique)
 *       - email (required, valid format)
 *       - password (required, min 8 chars)
 *       - confirmPassword (must match password)
 * - [ ] Add client-side validation
 * - [ ] Add useState for form data, loading, errors
 * - [ ] Create handleSubmit to call signup API
 * - [ ] POST to /api/users/signup/ with user data
 * - [ ] On success: auto-login or redirect to /login
 * - [ ] On error: display validation errors from API
 * - [ ] Add "Already have an account? Login" link
 * - [ ] Add password strength indicator (stretch goal)
 * 
 * API Endpoint: POST /api/users/signup/
 * Request: { username, email, password }
 * Response: { id, username, email } or { errors: {...} }
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.scss';

function Signup() {
  // TODO: Natalia - Add form state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    // TODO: Natalia - Update form state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const validateForm = () => {
    // TODO: Natalia - Implement validation
    // - Check all fields filled
    // - Validate email format
    // - Check password length >= 8
    // - Check passwords match
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Natalia - Implement signup logic
    // 1. Validate form
    // 2. setLoading(true)
    // 3. POST to /api/users/signup/
    // 4. Handle success/error
    console.log('Natalia: Implement signup submit');
  };
  
  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <p>Natalia: Build the signup form</p>
      
      <form onSubmit={handleSubmit}>
        {/* TODO: Username input */}
        {/* TODO: Email input */}
        {/* TODO: Password input */}
        {/* TODO: Confirm password input */}
        {/* TODO: Submit button */}
        {/* TODO: Error display */}
        {/* TODO: Link to login */}
      </form>
    </div>
  );
}

export default Signup;