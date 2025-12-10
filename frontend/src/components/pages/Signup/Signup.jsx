/**
 * =============================================================================
 * SIGNUP PAGE
 * =============================================================================
 *
 * 🔵 PABLO - UI/Styling ✅ DONE
 * 🟡 NATALIA - Form Logic & Auth Integration ❌ TODO
 *
 * WHAT NATALIA NEEDS TO DO:
 * 1. Import useAuth from contexts
 * 2. Get the signup function from useAuth()
 * 3. Implement handleSubmit to call signup(username, email, password)
 * 4. Handle success → navigate to /login (or auto-login)
 * 5. Handle errors → show error message
 *
 * =============================================================================
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// TODO: NATALIA - Import useAuth
// import { useAuth } from '../../../contexts/AuthContext';
import './Signup.scss';

function Signup() {
  const navigate = useNavigate();
  
  // TODO: NATALIA - Get signup function from useAuth
  // const { signup } = useAuth();
  
  // Form state - PROVIDED FOR YOU
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes - PROVIDED FOR YOU
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation - PROVIDED FOR YOU
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

  // TODO: NATALIA - Implement handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // TODO: NATALIA - Call signup from AuthContext
    // Steps:
    // 1. Call: const result = await signup(formData.username, formData.email, formData.password)
    // 2. If result.success → navigate('/login') or navigate('/home') if auto-login
    // 3. If !result.success → setErrors({ submit: result.error })
    
    console.log('NATALIA: Implement signup call here');
    console.log('Username:', formData.username);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    
    // Placeholder - remove this when implementing
    setTimeout(() => {
      setErrors({ submit: 'Signup not implemented yet - NATALIA TODO' });
      setIsLoading(false);
    }, 1000);
  };

  // ========== JSX - STYLING DONE BY PABLO ==========
  return (
    <div className="signup-container">
      <div className="signup-card">
        <button onClick={() => navigate('/')} className="back-button" title="Back to Home">
          <svg width="44" height="44" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L25.5 8.5V19.5L14 26L2.5 19.5V8.5L14 2Z" stroke="url(#hex-gradient-signup)" strokeWidth="1.5" fill="none"/>
            <path d="M16 10L11 14L16 18" stroke="url(#arrow-gradient-signup)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="hex-gradient-signup" x1="0" y1="0" x2="28" y2="28">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7"/>
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.7"/>
              </linearGradient>
              <linearGradient id="arrow-gradient-signup" x1="10" y1="10" x2="18" y2="18">
                <stop offset="0%" stopColor="#6366f1"/>
                <stop offset="100%" stopColor="#a855f7"/>
              </linearGradient>
            </defs>
          </svg>
        </button>
        <div className="signup-header">
          <h1 className="signup-title">
            <span className="title-word-left" data-word="Join">Join</span>
            <span className="title-separator">•</span>
            <span className="title-word-right" data-word="HUDDL">HUDDL</span>
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
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Choose a username…"
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
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email…"
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
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Create a password…"
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
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password…"
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
          <p>Already have an account? <button onClick={() => navigate('/login')} className="link-button">Sign in</button></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
