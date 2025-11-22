/**
 * APP COMPONENT (Main Router)
 * 
 * Purpose: Root component - sets up routing for entire app
 * Owner: Natalia (Routing & Protected Routes)
 * Status: BASIC ROUTES COMPLETE - needs protected routes
 * 
 * TODO:
 * - Add protected route wrapper (PrivateRoute component)
 * - Make /home, /profile, /friends require authentication
 * - Redirect to /login if user not authenticated
 * - Add context provider for global state (user, auth token)
 * - Add error boundary (optional)
 * - NO STYLING - Pablo handles that
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing/Landing';
import Login from './components/pages/Login/Login';
import Signup from './components/pages/Signup/Signup';
import Home from './components/pages/Home/Home';
import Profile from './components/pages/Profile/Profile';
import Friends from './components/pages/Friends/Friends';
import About from './components/pages/About/About';

function App() {
  // TODO: Add authentication context/state
  // TODO: Create PrivateRoute component
  // TODO: Wrap protected routes with PrivateRoute
  
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} /> {/* TODO: Make this protected */}
          <Route path="/profile" element={<Profile />} /> {/* TODO: Make this protected */}
          <Route path="/friends" element={<Friends />} /> {/* TODO: Make this protected */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;