// 🔵 PABLO - UI Architect
// App.jsx - Main routing and layout structure

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import SideNav from './components/layout/SideNav';
import Landing from './components/pages/Landing/Landing';
import Home from './components/pages/Home/Home';
import Login from './components/pages/Login/Login';
import SignUp from './components/pages/Signup/Signup';
import Profile  from './components/pages/Profile';
import About from './components/pages/About/About';
import Friends from './components/pages/Friends/Friends';
import './styles/App.css';
import './styles/Blobs.css';
import './styles/Logo.css';
import './components/pages/Landing/Landing.css';

function AppContent() {
  const location = useLocation();// 🔵 Gets current URL path
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