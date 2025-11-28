// 🔵 PABLO - UI Architect
// App.jsx - Main routing and layout structure

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// Layout components
import TopBar from './components/layout/TopBar';
import SideNav from './components/layout/SideNav';
// Page components
import Landing from './components/pages/Landing';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import SignUp from './components/pages/Signup';
import Profile from './components/pages/Profile';
import About from './components/pages/About';
import Friends from './components/pages/Friends';
// Global styles now imported via main.scss in main.jsx

function AppContent() {
  const location = useLocation();// 🔵 Gets current URL path

  // 🔵 Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  // 🔵 Logic: Should we show nav bars?
  const isAuthPage = location.pathname === '/login' ||
  // "Is this a login or signup page?"
   location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';
  // "Is this the landing page?"

  return (
    <div className="App">
    {/* 🔵 TopBar shows UNLESS on landing or auth pages */}
      {!isLandingPage && !isAuthPage && <TopBar />}

       {/* 🎨 Background decoration (always visible) */}
      <div className="blob-left"></div>
      <div className="blob-right"></div>

       {/* 🟡 Main Content - Router decides which page to show */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/friends" element={<Friends/>}/>
        </Routes>
      </div>

       {/* 🔵 SideNav shows UNLESS on landing or auth pages */}
      {!isAuthPage && !isLandingPage && <SideNav />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>{/* 🟡 Enables routing (URL matching) */}
      <AppContent />
    </BrowserRouter>
  );
}

export default App;