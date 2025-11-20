import { useNavigate } from 'react-router-dom';
import './Landing.css';


function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">HUDDL</h1>
      <div className="auth-buttons">
        <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;
