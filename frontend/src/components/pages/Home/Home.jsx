/**
 * ============================================================================
 * HOME COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Home/Home.jsx
 * Assigned to: TITO
 * 
 * Main home/feed page.
 * 
 * TODO:
 * - [ ] Fetch all posts from API
 * - [ ] Render TimelineRiverFeed with posts
 * - [ ] Handle loading state
 * - [ ] Handle error state
 * - [ ] Pull to refresh / load more
 * - [ ] Create post button/action
 * 
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import './Home.scss';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch posts from API
  }, []);

  if (loading) {
    return <div className="home-page loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* TODO: Create post button */}
      {/* TODO: Render TimelineRiverFeed with posts */}
      <p>Home - Implement me!</p>
    </div>
  );
};

export default Home;
