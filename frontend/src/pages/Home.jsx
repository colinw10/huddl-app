import huddlLogo from '../assets/HUDDL.svg';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src={huddlLogo} alt="HUDDL Logo" className="huddl-logo" />
      <div className="auth-buttons">
        <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
