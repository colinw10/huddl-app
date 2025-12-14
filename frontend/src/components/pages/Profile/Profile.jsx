import React, { useState } from 'react';
// 🔵 PABLO - UI/Styling | 🟡 NATALIA - API Logic
// Profile.jsx - User profile page with timeline

import './Profile.scss';
import ProfileCard from './components/ProfileCard';
import ComposerModal from './components/ComposerModal';
import TimelineRiver from './components/TimelineRiver';
import { usePosts, useAuth } from '../../../contexts';

function Profile() {
  const { deletePost, updatePost } = usePosts();
  const { user } = useAuth();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [composerType, setComposerType] = useState('thought'); // 'thought' or 'media'
  const [composerText, setComposerText] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'feed'
  
  // Sample data - in real app, this would come from API
  const [posts] = useState([
    { id: 1, type: 'text', content: 'Just shipped a new feature! The profile page is looking amazing.', timestamp: '2 hours ago' },
    { id: 2, type: 'media', content: 'Working on some cool UI experiments with React and modern CSS.', timestamp: '5 hours ago', hasImage: true },
    { id: 3, type: 'achievement', content: 'Completed 30-day coding streak!', timestamp: '1 day ago', milestone: true },
    { id: 4, type: 'text', content: 'The glassmorphism effect creates such a clean aesthetic.', timestamp: '1 day ago' },
    { id: 5, type: 'media', content: 'Sunset views from the office.', timestamp: '2 days ago', hasImage: true },
    { id: 6, type: 'achievement', content: 'Hit 1K followers! Thank you all.', timestamp: '3 days ago', milestone: true },
    { id: 7, type: 'text', content: 'Sometimes the simplest solution is the best solution', timestamp: '4 days ago' },
    { id: 8, type: 'media', content: 'New setup for maximum productivity.', timestamp: '5 days ago', hasImage: true },
  ]);

  // Sample feed posts from friends
  const [feedPosts] = useState([
    { id: 101, author: 'Pablo Cordero', avatar: 'PC', content: 'Just finished an amazing workout!', timestamp: '1h ago', type: 'text' },
    { id: 102, author: 'Colin Weir', avatar: 'CW', content: 'Beach day with the crew.', timestamp: '2h ago', type: 'media', hasImage: true },
    { id: 103, author: 'Tito', avatar: 'T', content: 'New PR on deadlifts!', timestamp: '3h ago', type: 'achievement', milestone: true },
    { id: 104, author: 'Crystal Ruiz', avatar: 'CR', content: 'Coffee and code.', timestamp: '5h ago', type: 'text' },
    { id: 105, author: 'Arthur Bernier', avatar: 'AB', content: 'Sunset yoga session.', timestamp: '6h ago', type: 'media', hasImage: true },
  ]);

  // Categorize posts into river columns
  const textPosts = posts.filter(p => p.type === 'text');
  const mediaPosts = posts.filter(p => p.type === 'media');
  const achievementPosts = posts.filter(p => p.type === 'achievement');

  // Categorize feed posts
  const feedTextPosts = feedPosts.filter(p => p.type === 'text');
  const feedMediaPosts = feedPosts.filter(p => p.type === 'media');
  const feedAchievementPosts = feedPosts.filter(p => p.type === 'achievement');

  return (
    <div className="user-profile-page river-profile">
      {/* Background accent blobs */}
      <div className="page-blob-top"></div>
      <div className="page-blob-bottom"></div>

      {/* Flippable Profile Header Card */}
      <ProfileCard isFlipped={isFlipped} setIsFlipped={setIsFlipped} posts={posts} user={user} />

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button 
          className={`view-toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`}
          onClick={() => setViewMode('timeline')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          My Timeline
        </button>
        <button 
          className={`view-toggle-btn feed-btn ${viewMode === 'feed' ? 'active' : ''}`}
          onClick={() => setViewMode('feed')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Friends Feed
        </button>
      </div>

      {/* Quick Composer - Same as Home */}
      <div className="quick-composer-buttons">
        <div className="quick-composer-section unified-composer">
          <div className="quick-composer-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="quick-composer-input-wrapper">
            <textarea
              className="quick-composer-textarea"
              placeholder="Share something…"
              value={composerText}
              onChange={(e) => setComposerText(e.target.value)}
              rows={1}
            />
          </div>
          <button 
            className="quick-composer-expand-btn"
            onClick={() => setShowComposer(true)}
            title="Expand"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"/>
              <polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/>
              <line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Composer Modal */}
      <ComposerModal 
        showComposer={showComposer}
        setShowComposer={setShowComposer}
        composerType={composerType}
        setComposerType={setComposerType}
      />

      {/* Timeline River Flow - Three Column Layout */}
      <TimelineRiver 
        viewMode={viewMode}
        textPosts={textPosts}
        mediaPosts={mediaPosts}
        achievementPosts={achievementPosts}
        feedTextPosts={feedTextPosts}
        feedMediaPosts={feedMediaPosts}
        feedAchievementPosts={feedAchievementPosts}
        onDeletePost={deletePost}
        onUpdatePost={updatePost}
      />
    </div>
  );
}

export default Profile;