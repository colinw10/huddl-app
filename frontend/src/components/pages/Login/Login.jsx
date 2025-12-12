/**
 * ============================================================================
 * LOGIN COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Login/Login.jsx
 * Assigned to: COLIN
 * 
 * Login form with email/password authentication.
 * 
 * TODO:
 * - [ ] Controlled form inputs (email, password)
 * - [ ] Form validation
 * - [ ] Call login API endpoint
 * - [ ] Store tokens and redirect on success
 * - [ ] Show error messages
 * - [ ] Loading state during submission
 * 
 * ============================================================================
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Validate form
    // TODO: Call login API
    // TODO: Store tokens
    // TODO: Redirect to home
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        {/* TODO: Email input */}
        {/* TODO: Password input */}
        {/* TODO: Submit button */}
        {/* TODO: Error display */}
        {/* TODO: Link to signup */}
        <p>Login - Implement me!</p>
      </form>
    </div>
  );
};

export default Login;
