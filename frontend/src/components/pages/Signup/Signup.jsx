// 🔵 PABLO - UI/Styling | 🟡 NATALIA - API Logic
// Signup.jsx - User registration page

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';
// BackButton styles now in main.scss

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Add actual API call here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log('Signup submitted:', formData);
      // Navigate to feed on success
      navigate('/feed');
    } catch {
      setErrors({ submit: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <button onClick={() => navigate('/')} className="back-button" title="Back to Home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <div className="signup-header">
          <h1 className="signup-title">
            <span className="title-word-left" data-word="Join">Join</span>
            <span className="title-separator">•</span>
            <span className="title-word-right" data-word="Huddl">Huddl</span>
          </h1>
          <p className="signup-subtitle">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'error' : ''} ${formData.username ? 'has-value' : ''}`}
              placeholder="Choose a username"
              autoComplete="username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''} ${formData.email ? 'has-value' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''} ${formData.password ? 'has-value' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''} ${formData.confirmPassword ? 'has-value' : ''}`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button 
            type="submit" 
            className={`btn-submit ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="signup-footer">
          <p className="footer-text">
            Already have an account? <button onClick={() => navigate('/login')} className="footer-link">Sign in</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;