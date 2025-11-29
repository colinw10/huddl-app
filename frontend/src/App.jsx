/**
 * =============================================================================
 * APP COMPONENT (Main Router & Shell)
 * =============================================================================
 *
 * File: frontend/src/App.jsx
 * Assigned to: PABLO
 * Responsibility: Root component, routing, layout shell, theming
 *
 * TODO:
 * - [ ] Create Shell layout wrapper with SideNav, TopBar, BottomNav
 * - [ ] Set up authentication context provider
 * - [ ] Create PrivateRoute component for protected routes
 * - [ ] Implement theme context (dark/light mode)
 * - [ ] Add animated background blobs
 * - [ ] Wrap routes in proper layout components
 * - [ ] Add error boundary for graceful error handling
 * - [ ] Set up global state management if needed
 *
 * NOTE: Natalia handles auth logic, Pablo handles layout/styling integration
 *
 * Status: PLACEHOLDER
 * =============================================================================
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing/Landing';
import Login from './components/pages/Login/Login';
import Signup from './components/pages/Signup/Signup';
import Home from './components/pages/Home/Home';
import Profile from './components/pages/Profile/Profile';
import Friends from './components/pages/Friends/Friends';
import About from './components/pages/About/About';

// TODO: Pablo - Import layout components
// import Shell from './components/layout/Shell/Shell';
// import { ThemeProvider } from './contexts/ThemeContext';
// import { AuthProvider } from './contexts/AuthContext';

function App() {
  // TODO: Pablo - Wrap with providers
  // TODO: Pablo - Create Shell wrapper for authenticated pages
  // TODO: Pablo - Add animated background blobs
  
  return (
    <Router>
      <div className="app">
        {/* TODO: Pablo - Add background blobs here */}
        {/* <div className="background-blobs">...</div> */}
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          
          {/* TODO: Pablo - Wrap protected routes in Shell layout */}
          {/* Protected routes - need PrivateRoute wrapper */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;