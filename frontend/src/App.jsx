import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile  from './pages/Profile';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>HUDDL</h1>
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