import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile  from './pages/Profile';
import huddlLogo from './assets/HUDDL.svg';
import './styles/App.css';
import './styles/Navigation.css';
import './styles/Blobs.css';
import './styles/Logo.css';
import './styles/Buttons.css';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  return (
    <div className="App">
      <nav className="glass-nav">
        <div className="nav-logo">HUDDL</div>
        <div className="nav-links">
          <a href="/feed">Feed</a>
          <a href="/profile">Profile</a>
          <a href="/about">About</a>
        </div>
      </nav>
      <div className="blob-left"></div>
      <div className="blob-right"></div>
      {isHomePage && (
        <>
          <img src={huddlLogo} alt="HUDDL Logo" className="huddl-logo" />
          <div className="auth-buttons">
            <button className="btn-login">Login</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </>
      )}
      <Routes>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;