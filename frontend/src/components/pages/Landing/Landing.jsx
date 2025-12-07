// 🔵 PABLO - UI Architect
// Landing.jsx - Welcome/landing page

import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import './Landing.scss';

// Golden ratio - the most aesthetically pleasing irrational number
const PHI = (1 + Math.sqrt(5)) / 2; // ≈ 1.618033988749895

function Landing() {
  const navigate = useNavigate();
  
  // Generate delays using golden ratio for beautiful pseudo-randomness
  // Uses the Weyl sequence: (n * φ) mod 1 - produces low-discrepancy sequence
  // This creates apparent randomness while being mathematically harmonious
  const BLOB_FADE_DELAY = 1.0;   // Wait for blobs to start fading in
  const PAGE_FADE_DURATION = 0.8; // Page fade-in duration
  const TOTAL_WAIT = BLOB_FADE_DELAY + PAGE_FADE_DURATION; // ~1.8s total before title
  const letterDelays = useMemo(() => {
    const letters = 'HUDDL'.split('');
    return letters.map((_, i) => {
      // Weyl sequence with golden ratio - spreads evenly yet appears random
      const weyl = ((i + 1) * PHI) % 1;
      // Scale to 0.6s max delay for snappy feel, offset by blob + page fade
      return TOTAL_WAIT + (weyl * 0.6);
    });
  }, []);

  // Random-ish hover delays for each letter (50-150ms range)
  const hoverDelays = [0.08, 0.12, 0.05, 0.14, 0.09];
  
  // Unique color variant for each letter
  const colorVariants = ['magenta', 'cyan', 'aqua', 'purple', 'blue'];

  return (
    <div className="landing-container">
      <h1 className="landing-title">
        {'HUDDL'.split('').map((letter, index) => {
          const isFlipped = index === 0 || index === 4; // H and L
          return (
            <span 
              key={index} 
              className={`title-letter ${isFlipped ? 'title-letter--flip' : ''} title-letter--${colorVariants[index]}`}
              style={{ 
                animationDelay: `${letterDelays[index]}s`,
                '--hover-delay': `${hoverDelays[index]}s`
              }}
            >
              {letter}
            </span>
          );
        })}
      </h1>
      <div className="auth-buttons">
        <button className="btn-login" onClick={() => navigate('/login')}>Login</button>
        <button className="btn-signup" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Landing;
