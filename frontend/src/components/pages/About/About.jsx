import { useNavigate } from 'react-router-dom';

// 🟣 CRYSTAL - Friends System Lead
// About.jsx - About page

function About() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">About Huddl</h1>
        <div className="about-content">
          <p>Connect, share, and collaborate with your community.</p>
          <p>Huddl brings people together in meaningful ways.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
