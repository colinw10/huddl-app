import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// 🔵 PABLO - UI/Styling | 🟡 NATALIA - API Logic
// Profile.jsx - User profile page with timeline
// Supports viewing own profile (/profile) and other users' profiles (/profile/:username)

import './Profile.scss';
import ProfileCard from './components/ProfileCard';
import ComposerModal from './components/ComposerModal';
import TimelineRiver from './components/TimelineRiver';
import { usePosts, useAuth, useFriends, useMessages } from '../../../contexts';

function Profile() {
  const { posts, deletePost, updatePost, createPost } = usePosts();
  const { user: currentUser, isLoading: authLoading } = useAuth();
  const { friends } = useFriends();
  const { openMessages } = useMessages();
  const { username: profileUsername } = useParams(); // Get username from URL if viewing someone else
  
  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="user-profile-page river-profile">
        <div className="loading-state">Loading profile...</div>
      </div>
    );
  }
  
  // Determine if viewing own profile or someone else's
  const isOwnProfile = !profileUsername || profileUsername === currentUser?.username;
  
  // Get the profile user data
  const profileUser = useMemo(() => {
    if (isOwnProfile) {
      return currentUser;
    }
    
    // Try to find from post authors first (they have the most complete data)
    const postMatch = posts.find(p => p.author?.username === profileUsername)?.author;
    if (postMatch) {
      console.log('Found user from post author:', postMatch);
      return postMatch;
    }
    
    // Find the user from friends list
    const friendMatch = friends?.find(f => f.username === profileUsername);
    if (friendMatch) {
      console.log('Found user from friends:', friendMatch);
      return friendMatch;
    }
    
    // Fallback - at minimum show the username from URL
    console.log('Using fallback for:', profileUsername);
    return { 
      username: profileUsername, 
      first_name: profileUsername, // Use username as display if we can't find real name
      last_name: '' 
    };
  }, [isOwnProfile, currentUser, friends, posts, profileUsername]);
  
  // Helper to get display name (full name if available, otherwise username)
  const getDisplayName = (user) => {
    if (!user) return 'User';
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
    return fullName || user.username || 'User';
  };
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [composerType, setComposerType] = useState('thought'); // 'thought' or 'media'
  const [composerText, setComposerText] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'feed'
  const [isPosting, setIsPosting] = useState(false);

  // HANDLER: Submit from inline composer (Cmd/Ctrl + Enter)
  const handleInlineKeyDown = async (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleInlinePost();
    }
  };

  // HANDLER: Post from inline composer
  const handleInlinePost = async () => {
    if (!composerText.trim() || isPosting) return;
    
    setIsPosting(true);
    const result = await createPost({ content: composerText.trim(), type: 'thoughts' });
    setIsPosting(false);
    
    if (result.success) {
      setComposerText('');
    } else {
      alert(result.error || 'Failed to create post');
    }
  };
  
  // Filter posts by the profile user for "My Timeline" / "Their Timeline"
  const profilePosts = posts.filter(p => p.author?.username === profileUser?.username);
  
  // Friends' posts for "Friends Feed" - ONLY show on own profile
  const friendsPosts = isOwnProfile 
    ? posts.filter(p => p.author?.username !== currentUser?.username)
    : [];

  // Categorize profile user's posts into river columns
  const textPosts = profilePosts.filter(p => p.type === 'thoughts');
  const mediaPosts = profilePosts.filter(p => p.type === 'media');
  const achievementPosts = profilePosts.filter(p => p.type === 'milestones');

  // Categorize friends' posts
  const feedTextPosts = friendsPosts.filter(p => p.type === 'thoughts');
  const feedMediaPosts = friendsPosts.filter(p => p.type === 'media');
  const feedAchievementPosts = friendsPosts.filter(p => p.type === 'milestones');

  // Debug: log friends posts counts
  console.log('Profile Debug:', {
    isOwnProfile,
    profileUser: profileUser?.username,
    currentUser: currentUser?.username,
    totalPosts: posts.length,
    profilePostsCount: profilePosts.length,
    textPostsCount: textPosts.length,
    mediaPostsCount: mediaPosts.length,
    achievementPostsCount: achievementPosts.length,
    allPostAuthors: [...new Set(posts.map(p => p.author?.username))],
  });

  return (
    <div className="user-profile-page river-profile">
      {/* Background accent blobs */}
      <div className="page-blob-top"></div>
      <div className="page-blob-bottom"></div>

      {/* Flippable Profile Header Card */}
      <ProfileCard 
        isFlipped={isFlipped} 
        setIsFlipped={setIsFlipped} 
        posts={profilePosts} 
        user={profileUser}
        isOwnProfile={isOwnProfile}
      />

      {/* View Mode Toggle - Only show Friends Feed on OWN profile */}
      {isOwnProfile && (
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
      )}
      
      {/* Viewing another user's profile - show their name with message button */}
      {!isOwnProfile && (
        <div className="profile-header-label">
          <h2 className="other-user-label">
            {getDisplayName(profileUser)}'s Timeline
          </h2>
          <button 
            className="profile-message-btn"
            onClick={() => openMessages({
              id: profileUser?.id,
              username: profileUser?.username,
              displayName: getDisplayName(profileUser),
            })}
            title={`Message ${getDisplayName(profileUser)}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <line x1="9" y1="10" x2="15" y2="10"/>
            </svg>
          </button>
        </div>
      )}

      {/* Quick Composer - Only show on own profile */}
      {isOwnProfile && (
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
                onKeyDown={handleInlineKeyDown}
                rows={1}
                disabled={isPosting}
              />
              {/* Post icon - shows when there's text */}
              {composerText.trim() && !isPosting && (
                <span 
                  className="quick-composer-post-icon"
                  onClick={handleInlinePost}
                  title="Post"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12,3 21,19 3,19"/>
                  </svg>
                </span>
              )}
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
      )}

      {/* Composer Modal - Only on own profile */}
      {isOwnProfile && (
        <ComposerModal 
          showComposer={showComposer}
          setShowComposer={setShowComposer}
          composerType={composerType}
          setComposerType={setComposerType}
        />
      )}

      {/* Timeline River Flow - Three Column Layout */}
      <TimelineRiver 
        viewMode={isOwnProfile ? viewMode : 'timeline'}
        textPosts={textPosts.slice(0, 12)}
        mediaPosts={mediaPosts.slice(0, 12)}
        achievementPosts={achievementPosts.slice(0, 12)}
        feedTextPosts={feedTextPosts}
        feedMediaPosts={feedMediaPosts}
        feedAchievementPosts={feedAchievementPosts}
        onDeletePost={isOwnProfile ? deletePost : null}
        onUpdatePost={isOwnProfile ? updatePost : null}
        isOwnProfile={isOwnProfile}
      />

      {/* All Posts Section - Chronological feed of all posts */}
      {viewMode === 'timeline' && profilePosts.length > 0 && (
        <div className="all-posts-section">
          <div className="all-posts-header">
            <h3 className="all-posts-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
              All Posts
            </h3>
            <span className="all-posts-count">{profilePosts.length} posts</span>
          </div>
          <div className="all-posts-feed">
            {[...profilePosts]
              .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
              .map(post => (
                <div key={post.id} className={`all-posts-card all-posts-card--${post.type}`}>
                  <div className="all-posts-card-header">
                    <span className={`all-posts-type-badge all-posts-type-badge--${post.type}`}>
                      {post.type === 'thoughts' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                      )}
                      {post.type === 'media' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      )}
                      {post.type === 'milestones' && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      )}
                      {post.type}
                    </span>
                    <span className="all-posts-date">
                      {new Date(post.created_at || post.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: new Date(post.created_at || post.createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                      })}
                    </span>
                  </div>
                  {post.content && (
                    <p className="all-posts-content">{post.content}</p>
                  )}
                  {post.media_url && (
                    <div className="all-posts-media">
                      <img src={post.media_url} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="all-posts-stats">
                    <span className={`all-posts-likes ${post.is_liked ? 'is-liked' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                              fill={post.is_liked ? "#3b82f6" : "none"} 
                              stroke={post.is_liked ? "#3b82f6" : "currentColor"} 
                              strokeWidth="1.5"/>
                      </svg>
                      {post.likes_count || 0}
                    </span>
                    <span className="all-posts-comments">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      {post.reply_count || 0}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;