import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// 🔵 PABLO - UI/Styling | 🟡 NATALIA - API Logic
// Profile.jsx - User profile page with timeline
// Supports viewing own profile (/profile) and other users' profiles (/profile/:username)

import './Profile.scss';
import ProfileCard from './components/ProfileCard';
import ComposerModal from './components/ComposerModal';
import TimelineRiver from './components/TimelineRiver';
import MediaLightbox from '../Home/components/MediaLightbox/MediaLightbox';
import { usePosts, useAuth, useFriends, useMessages } from '../../../contexts';

function Profile() {
  const { posts, deletePost, updatePost, createPost, likePost, createReply } = usePosts();
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
  
  // Helper to get initials from user
  const getInitials = (user) => {
    if (!user) return '??';
    const first = user.first_name?.[0] || '';
    const last = user.last_name?.[0] || '';
    if (first && last) return `${first}${last}`.toUpperCase();
    if (first) return first.toUpperCase();
    if (user.username) return user.username.slice(0, 2).toUpperCase();
    return '??';
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [composerType, setComposerType] = useState('thought'); // 'thought' or 'media'
  const [composerText, setComposerText] = useState('');
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'feed'
  const [isPosting, setIsPosting] = useState(false);
  
  // State for All Posts section actions
  const [allPostsDeleteId, setAllPostsDeleteId] = useState(null);
  const [allPostsEditId, setAllPostsEditId] = useState(null);
  const [allPostsEditContent, setAllPostsEditContent] = useState('');
  
  // State for All Posts inline commenting
  const [allPostsCommentId, setAllPostsCommentId] = useState(null);
  const [allPostsCommentText, setAllPostsCommentText] = useState('');
  
  // State for All Posts media lightbox
  const [allPostsLightboxPost, setAllPostsLightboxPost] = useState(null);

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
        profileUser={profileUser}
      />

      {/* All Posts Section - Uses same chamfered river-card styles as timeline carousel */}
      {viewMode === 'timeline' && profilePosts.length > 0 && (
        <div className="all-posts-section river-style">
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
          <div className="all-posts-feed river-feed">
            {[...profilePosts]
              .sort((a, b) => new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt))
              .map(post => {
                const cardTypeClass = post.type === 'thoughts' ? 'text-card' : post.type === 'media' ? 'media-card' : 'achievement-card';
                return (
                  <div key={post.id} className={`river-card ${cardTypeClass}`}>
                    {/* User header inside card */}
                    <div className="river-card-author">
                      <div className="friend-avatar">{getInitials(profileUser)}</div>
                      <span className="friend-name">{profileUser?.username || 'User'}</span>
                    </div>
                    {/* Achievement badge for milestones */}
                    {post.type === 'milestones' && (
                      <div className="achievement-badge">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                    )}
                    {/* Clickable media - opens lightbox */}
                    {post.media_url && (
                      <div 
                        className="river-card-media clickable"
                        onClick={() => setAllPostsLightboxPost(post)}
                        style={{ cursor: 'pointer' }}
                      >
                        <img src={post.media_url} alt="" loading="lazy" className="media-image" />
                        <div className="media-expand-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="river-card-content">
                      {post.content && (
                        <p className="river-post-text">{post.content}</p>
                      )}
                      <span className="river-timestamp">
                        {new Date(post.created_at || post.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: new Date(post.created_at || post.createdAt).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                        })}
                      </span>
                    </div>
                    <div className="river-post-actions my-post-actions">
                      {/* Like button */}
                      <div 
                        className={`river-post-likes ${post.is_liked ? 'is-liked' : ''}`} 
                        title={post.is_liked ? 'Unlike' : 'Like'} 
                        style={{ cursor: 'pointer' }}
                        onClick={async (e) => {
                          e.stopPropagation();
                          await likePost(post.id);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                                fill={post.is_liked ? "#3b82f6" : "none"} 
                                stroke={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"} 
                                strokeWidth="1.5"/>
                        </svg>
                        {post.likes_count || 0}
                      </div>
                      {/* Comment button - opens inline composer */}
                      <button 
                        className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''} ${allPostsCommentId === post.id ? 'active' : ''}`} 
                        title="Comment"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (allPostsCommentId === post.id) {
                            setAllPostsCommentId(null);
                            setAllPostsCommentText('');
                          } else {
                            setAllPostsCommentId(post.id);
                            setAllPostsCommentText('');
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
                      </button>
                      {/* Share/Repost button */}
                      <button 
                        className="river-action-btn" 
                        title="Share"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = `${window.location.origin}/post/${post.id}`;
                          navigator.clipboard.writeText(url);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(79,255,255,0.5)" strokeWidth="1.5">
                          <polyline points="17 1 21 5 17 9"/>
                          <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                          <polyline points="7 23 3 19 7 15"/>
                          <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                        </svg>
                      </button>
                      {/* Expand to lightbox button for media posts */}
                      {post.media_url && (
                        <button 
                          className="river-action-btn" 
                          title="Expand"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAllPostsLightboxPost(post);
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(167,131,255,0.6)" strokeWidth="1.5">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </button>
                      )}
                      {/* Edit button */}
                      <button 
                        className="river-action-btn river-action-btn--edit" 
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAllPostsEditId(post.id);
                          setAllPostsEditContent(post.content || '');
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      {/* Delete button */}
                      <button 
                        className="river-action-btn river-action-btn--delete" 
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAllPostsDeleteId(post.id);
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Inline Comment Composer */}
                    {allPostsCommentId === post.id && (
                      <div className="inline-comment-composer">
                        <div className="comment-input-wrapper">
                          <textarea
                            className="comment-input"
                            placeholder="Write a comment..."
                            value={allPostsCommentText}
                            onChange={(e) => {
                              setAllPostsCommentText(e.target.value);
                              e.target.style.height = 'auto';
                              e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            rows={1}
                            autoFocus
                            onKeyDown={async (e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (allPostsCommentText.trim()) {
                                  await createReply(post.id, { content: allPostsCommentText.trim(), type: 'thoughts' });
                                  setAllPostsCommentText('');
                                  setAllPostsCommentId(null);
                                }
                              }
                              if (e.key === 'Escape') {
                                setAllPostsCommentId(null);
                                setAllPostsCommentText('');
                              }
                            }}
                          />
                        </div>
                        <button 
                          className="comment-submit-btn"
                          disabled={!allPostsCommentText.trim()}
                          onClick={async () => {
                            if (allPostsCommentText.trim()) {
                              await createReply(post.id, { content: allPostsCommentText.trim(), type: 'thoughts' });
                              setAllPostsCommentText('');
                              setAllPostsCommentId(null);
                            }
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 6 15 12 9 18"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Media Lightbox for All Posts */}
      {allPostsLightboxPost && (
        <MediaLightbox
          post={allPostsLightboxPost}
          onClose={() => setAllPostsLightboxPost(null)}
          commentText={allPostsCommentText}
          setCommentText={setAllPostsCommentText}
        />
      )}

      {/* Delete Confirmation Modal for All Posts */}
      {allPostsDeleteId && (
        <div className="delete-confirm-overlay" onClick={() => setAllPostsDeleteId(null)}>
          <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-confirm-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.8)" strokeWidth="1.5">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </div>
            <h3 className="delete-confirm-title">Delete Post?</h3>
            <p className="delete-confirm-text">This action cannot be undone.</p>
            <div className="delete-confirm-actions">
              <button 
                className="delete-confirm-btn delete-confirm-btn--cancel"
                onClick={() => setAllPostsDeleteId(null)}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-btn delete-confirm-btn--delete"
                onClick={async () => {
                  await deletePost(allPostsDeleteId);
                  setAllPostsDeleteId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal for All Posts */}
      {allPostsEditId && (
        <div className="edit-modal-overlay" onClick={() => { setAllPostsEditId(null); setAllPostsEditContent(''); }}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header">
              <h3>Edit Post</h3>
              <button 
                className="edit-modal-close"
                onClick={() => { setAllPostsEditId(null); setAllPostsEditContent(''); }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <textarea
              className="edit-modal-textarea"
              value={allPostsEditContent}
              onChange={(e) => setAllPostsEditContent(e.target.value)}
              placeholder="Edit your post..."
              autoFocus
            />
            <div className="edit-modal-actions">
              <button 
                className="edit-modal-btn edit-modal-btn--cancel"
                onClick={() => { setAllPostsEditId(null); setAllPostsEditContent(''); }}
              >
                Cancel
              </button>
              <button 
                className="edit-modal-btn edit-modal-btn--save"
                onClick={async () => {
                  await updatePost(allPostsEditId, { content: allPostsEditContent });
                  setAllPostsEditId(null);
                  setAllPostsEditContent('');
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;