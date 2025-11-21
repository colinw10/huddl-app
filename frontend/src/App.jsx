import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/pages/Landing/Landing';
import Login from './components/pages/Login/Login';
import Signup from './components/pages/Signup/Signup';
import Home from './components/pages/Home/Home';
import Profile from './components/pages/Profile/Profile';
import Friends from './components/pages/Friends/Friends';
import About from './components/pages/About/About';
import TopBar from './components/layout/TopBar/TopBar';
import BottomNav from './components/layout/BottomNav/BottomNav';

function App() {
  return (
    <Router>
      <div className="app">
        <TopBar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;