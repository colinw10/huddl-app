/**
 * =============================================================================
 * LANDING PAGE - App Introduction
 * =============================================================================
 * 
 * File: frontend/src/components/pages/Landing/Landing.jsx
 * Assigned to: NATALIA
 * Responsibility: First page users see - hero, features, CTAs
 * 
 * TODO:
 * - [ ] Create hero section with:
 *       - App logo
 *       - Tagline: "Your social huddle awaits"
 *       - Brief description
 * - [ ] Add feature showcase (3-4 cards):
 *       - Timeline River (unique feed)
 *       - Profile Cards (flip animation)
 *       - Friends Huddle (social connections)
 * - [ ] Add CTA buttons:
 *       - "Get Started" → /signup
 *       - "Login" → /login
 * - [ ] Make it responsive
 * - [ ] Add smooth scroll to features section
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

function Landing() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>HUDDL</h1>
        <p>Natalia: Build the landing page hero</p>
        {/* TODO: Add tagline */}
        {/* TODO: Add CTA buttons */}
      </section>
      
      {/* Features Section */}
      <section className="features">
        <p>Natalia: Add feature cards</p>
        {/* TODO: Add feature showcase */}
      </section>
      
      {/* CTA Section */}
      <section className="cta">
        <Link to="/signup">Get Started</Link>
        <Link to="/login">Login</Link>
      </section>
    </div>
  );
}

export default Landing;
