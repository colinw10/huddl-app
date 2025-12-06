import { useNavigate } from 'react-router-dom';
import './About.scss';

// 🟣 CRYSTAL - Friends System Lead
// About.jsx - About page

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <div className="about-hero">
        <span className="hero-label">About</span>
        <h1 className="hero-title">HuddL</h1>
        <p className="hero-sub">Not another social network.<br/>A digital neighborhood.</p>
      </div>

      <div className="about-grid">
        <div className="grid-item manifesto">
          <span className="item-number">•</span>
          <h2>We're tired of the same shit.</h2>
          <p>
            Algorithmic feeds. Dopamine-harvesting scroll holes. Platforms that treat your 
            attention like a commodity to be auctioned. Your friends don't even see what you post anymore.
          </p>
        </div>

        <div className="grid-item design">
          <span className="item-number">••</span>
          <h2>The aesthetic is the message.</h2>
          <p>
            If we had to name it—neo-punk. Technology that serves humans, not the other way around. The glows and gradients aren't a manifesto. They're just what felt right. That it doesn't look like every other app is a bonus.
          </p>
        </div>

        <div className="grid-item pull-quote">
          <blockquote>
            We'd rather make something people actually love than something nobody hates.
          </blockquote>
        </div>

        <div className="grid-item timing">
          <span className="item-number">•••</span>
          <h2>The internet used to work.</h2>
          <p>
            Your feed showed what your friends posted. In order. No algorithm deciding what 
            you "need" to see. Revolutionary, right? We're just bringing it back.
          </p>
        </div>

        <div className="grid-item honest">
          <span className="item-number">••••</span>
          <h2>Look</h2>
          <p>
            This won't replace Instagram. But not everything needs a billion users 
            to be substantive.  But the best communities aren't the biggest — they're the ones where people actually show up.
          </p>
          <p>
            The design is loud. The cyber aesthetic isn't for everyone. Good. Neither are we.
          </p>
        </div>

        <div className="grid-item team">
          <span className="item-number">―</span>
          <h2>Who we are.</h2>
          <p>
            A small crew who got tired of complaining and decided to build. No VC money 
            looking for 100x returns. Just people who think the internet could be better.
          </p>
        </div>

        <div className="grid-item cta">
          <span className="cta-text">Your feed should be yours.</span>
        </div>
      </div>
    </div>
  );
}

export default About;
