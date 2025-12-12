/**
 * ============================================================================
 * SIGNUP COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Signup/Signup.jsx
 * Assigned to: CRYSTAL
 * 
 * Signup form for new user registration.
 * 
 * TODO:
 * - [ ] Controlled form inputs (username, email, password, confirm password)
 * - [ ] Form validation (email format, password match, required fields)
 * - [ ] Call signup API endpoint
 * - [ ] Handle errors (email taken, etc.)
 * - [ ] Redirect to login on success
 * - [ ] Loading state during submission
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Validate form (passwords match, etc.)
    // TODO: Call signup API
    // TODO: Handle response/errors
    // TODO: Redirect to login
  };

  return (
    <div className="signup-page">
      <form onSubmit={handleSubmit}>
        {/* TODO: Username input */}
        {/* TODO: Email input */}
        {/* TODO: Password input */}
        {/* TODO: Confirm password input */}
        {/* TODO: Submit button */}
        {/* TODO: Error display */}
        {/* TODO: Link to login */}
        <p>Signup - Implement me!</p>
      </form>
    </div>
  );
};

export default Signup;
