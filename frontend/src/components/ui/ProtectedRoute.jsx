/**
 * =============================================================================
 * PROTECTED ROUTE COMPONENT
 * =============================================================================
 * 
 * Wraps routes that require authentication.
 * Redirects to landing page if user is not logged in.
 * 
 * Usage in App.jsx:
 *   <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
 * =============================================================================
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Redirect to landing page if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL to redirect back after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
