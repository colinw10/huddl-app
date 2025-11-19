import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile  from './pages/Profile';
import huddlLogo from './assets/HUDDL.svg';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="corner-accent corner-top-left"></div>
      <div className="corner-accent corner-top-right"></div>
      <div className="corner-accent corner-bottom-left"></div>
      <div className="corner-accent corner-bottom-right"></div>
      <img src={huddlLogo} alt="HUDDL Logo" className="huddl-logo" />
      <Routes>
        <Route path="/feed" element={<Feed/>}/>
         <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
           <Route path="/profile" element={<Profile/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;