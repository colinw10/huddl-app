import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
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
import './styles/Buttons.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';

  return (
    <div className="App">
      {/* Top Bar */}
      {!isLandingPage && !isAuthPage && <TopBar />}

      {/* Background Blobs */}
      <div className="blob-left"></div>
      <div className="blob-right"></div>

      {/* Main Content Area */}
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

      {/* Bottom Navigation */}
      {!isAuthPage && !isLandingPage && <BottomNav />}
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