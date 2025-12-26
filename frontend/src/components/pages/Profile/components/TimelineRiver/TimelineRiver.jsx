// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Posts Data
// TimelineRiver.jsx - Profile timeline showing user's posts in river format

import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './TimelineRiver.scss';
import DeleteConfirmModal from '../../../Home/components/DeleteConfirmModal/DeleteConfirmModal';
import MediaLightbox from '../../../Home/components/MediaLightbox/MediaLightbox';
import { usePosts, useMessages, useAuth } from '../../../../../contexts';

// Helper to format dates nicely
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function TimelineRiver({ 
  viewMode, 
  textPosts: textPostsProps, 
  mediaPosts: mediaPostsProps, 
  achievementPosts: achievementPostsProps,
  feedTextPosts,
  feedMediaPosts,
  feedAchievementPosts,
  onDeletePost,
  onUpdatePost,
  isOwnProfile = true // Default to own profile for backwards compatibility
}) {
  // Get likePost and reply functions from context
  const { posts: allPosts, likePost, createReply, fetchReplies, updatePost: updateReply, deletePost: deleteReply } = usePosts();
  const { openMessages } = useMessages(); // For DM button on friend posts
  const { user: currentUser } = useAuth(); // For checking if user owns a comment
  const navigate = useNavigate(); // For navigating to user profiles
  
  // Get fresh post data from context (props may have stale snapshots)
  const getFreshPost = (postId) => allPosts.find(p => p.id === postId);
  
  // Map prop posts to fresh versions from context
  const textPosts = (textPostsProps || []).map(p => getFreshPost(p.id) || p);
  const mediaPosts = (mediaPostsProps || []).map(p => getFreshPost(p.id) || p);
  const achievementPosts = (achievementPostsProps || []).map(p => getFreshPost(p.id) || p);
  
  // Helper to get initials from author
  const getInitials = (author) => {
    if (!author) return '??';
    const first = author.first_name?.[0] || '';
    const last = author.last_name?.[0] || '';
    if (first && last) return `${first}${last}`.toUpperCase();
    if (first) return first.toUpperCase();
    if (author.username) return author.username.slice(0, 2).toUpperCase();
    return '??';
  };
  
  // Group friends' posts by username for feed mode
  const friendsGrouped = useMemo(() => {
    if (viewMode !== 'feed') return [];
    
    // Combine all friends posts
    const allFriendsPosts = [...(feedTextPosts || []), ...(feedMediaPosts || []), ...(feedAchievementPosts || [])];
    
    // Group by username
    const grouped = {};
    allFriendsPosts.forEach(post => {
      const username = post.author?.username || 'unknown';
      if (!grouped[username]) {
        grouped[username] = {
          username,
          avatar: getInitials(post.author),
          thoughts: [],
          media: [],
          milestones: []
        };
      }
      if (post.type === 'thoughts') grouped[username].thoughts.push(post);
      else if (post.type === 'media') grouped[username].media.push(post);
      else if (post.type === 'milestones') grouped[username].milestones.push(post);
    });
    
    return Object.values(grouped);
  }, [viewMode, feedTextPosts, feedMediaPosts, feedAchievementPosts]);

  // Debug log
  console.log('TimelineRiver Debug:', {
    viewMode,
    isOwnProfile,
    textPosts: textPosts?.length,
    mediaPosts: mediaPosts?.length,
    achievementPosts: achievementPosts?.length,
    feedTextPosts: feedTextPosts?.length,
    feedMediaPosts: feedMediaPosts?.length,
    feedAchievementPosts: feedAchievementPosts?.length,
  });

  // State for inline comment composer
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // State for thread/replies
  const [expandedThreadId, setExpandedThreadId] = useState(null);
  const [threadReplies, setThreadReplies] = useState({});
  const [loadingThread, setLoadingThread] = useState(null);
  const [showAllReplies, setShowAllReplies] = useState({});
  
  // State for editing replies
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editingReplyContent, setEditingReplyContent] = useState('');
  const [editingReplyParentId, setEditingReplyParentId] = useState(null);
  
  // State for edit/delete
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [deleteModalIsReply, setDeleteModalIsReply] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isComposerExpanded, setIsComposerExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // State for media lightbox
  const [expandedMediaPost, setExpandedMediaPost] = useState(null);

  // State for mobile category tabs
  const [mobileCategory, setMobileCategory] = useState('thoughts');

  // Deck index for carousel - per friend, per type
  const [deckIndices, setDeckIndices] = useState({});

  const getDeckIndex = (username, type) => {
    return deckIndices[`${username}-${type}`] || 0;
  };

  const nextCard = (username, type, total) => {
    if (total <= 1) return;
    const key = `${username}-${type}`;
    setDeckIndices(prev => ({ ...prev, [key]: ((prev[key] || 0) + 1) % total }));
  };

  const prevCard = (username, type, total) => {
    if (total <= 1) return;
    const key = `${username}-${type}`;
    setDeckIndices(prev => ({ ...prev, [key]: (prev[key] || 0) === 0 ? total - 1 : (prev[key] || 0) - 1 }));
  };

  // 🔵 Render action buttons for friend feed cards
  const renderFriendPostActions = (post) => {
    if (!post) return null;
    
    return (
      <div className="river-post-actions friend-post-actions">
        {/* Like button */}
        <div 
          className={`river-post-likes ${post.is_liked ? 'is-liked' : ''}`}
          onClick={async (e) => {
            e.stopPropagation();
            await likePost(post.id);
          }}
          title={post.is_liked ? 'Unlike' : 'Like'}
          style={{ cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                  fill={post.is_liked ? "#3b82f6" : "none"} 
                  stroke={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"} 
                  strokeWidth="1.5"/>
          </svg>
          {post.likes_count || 0}
        </div>
        
        {/* Comment button */}
        <button 
          className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''}`}
          title="Comment"
          onClick={() => handleCommentClick(post.id)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
        </button>
        
        {/* Share/Repost button */}
        <button className="river-action-btn" title="Repost">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(79,255,255,0.5)" strokeWidth="1.5">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>
        
        {/* Message button */}
        <button 
          className="river-action-btn river-action-btn--message" 
          title={`Message ${post.author?.username || 'user'}`}
          onClick={(e) => {
            e.stopPropagation();
            openMessages({
              id: post.author?.id,
              username: post.author?.username,
              displayName: post.author?.username,
            });
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(0,212,255,0.5)" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="9" y1="10" x2="15" y2="10"/>
          </svg>
        </button>
        
        {/* Bookmark button */}
        <button className="river-action-btn" title="Bookmark">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
    );
  };

  // 🟢 Render action buttons for profile timeline posts
  const renderMyPostActions = (post) => {
    if (!post) return null;
    
    return (
      <div className="river-post-actions my-post-actions">
        {/* Like button */}
        <div 
          className={`river-post-likes ${post.is_liked ? 'is-liked' : ''}`}
          onClick={async (e) => {
            e.stopPropagation();
            await likePost(post.id);
          }}
          title={post.is_liked ? 'Unlike' : 'Like'}
          style={{ cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                  fill={post.is_liked ? "#3b82f6" : "none"} 
                  stroke={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"} 
                  strokeWidth="1.5"/>
          </svg>
          {post.likes_count || 0}
        </div>
        
        {/* Comment button */}
        <button 
          className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''}`}
          title="Comment"
          onClick={() => handleCommentClick(post.id)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
        </button>
        
        {/* Share/Repost button */}
        <button className="river-action-btn" title="Share">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(79,255,255,0.5)" strokeWidth="1.5">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </button>
        
        {/* Save/Bookmark button - ONLY on other user's profile */}
        {!isOwnProfile && (
          <button className="river-action-btn river-action-btn--save" title="Save Post">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(167,131,255,0.6)" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
        )}
        
        {/* Edit button - ONLY on own profile */}
        {isOwnProfile && (
          <button 
            className="river-action-btn river-action-btn--edit" 
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              setEditingPostId(post.id);
              setCommentText(post.content);
              setIsEditMode(true);
              setIsComposerExpanded(true);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        )}
        
        {/* Delete button - ONLY on own profile */}
        {isOwnProfile && (
          <button 
            className="river-action-btn river-action-btn--delete" 
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModalPostId(post.id);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        )}
      </div>
    );
  };

  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  // Toggle thread view and fetch replies
  const toggleThread = async (postId) => {
    if (expandedThreadId === postId) {
      setExpandedThreadId(null);
    } else {
      setExpandedThreadId(postId);
      // Fetch replies if not already loaded
      if (!threadReplies[postId]) {
        setLoadingThread(postId);
        const result = await fetchReplies(postId);
        if (result.success) {
          setThreadReplies(prev => ({ ...prev, [postId]: result.data }));
        }
        setLoadingThread(null);
      }
    }
  };

  // Handle comment/reply submission
  const handleCommentSubmit = async (postId) => {
    if (!commentText.trim()) return;
    
    const result = await createReply(postId, { content: commentText.trim(), type: 'thoughts' });
    if (result.success) {
      // Add new reply to local state
      setThreadReplies(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), result.data]
      }));
      setCommentText('');
      setActiveCommentPostId(null);
      // Auto-expand thread to show new reply
      setExpandedThreadId(postId);
    }
  };

  // Handle editing a reply
  const handleEditReply = async (replyId, parentPostId) => {
    if (!editingReplyContent.trim()) return;
    
    const result = await updateReply(replyId, { content: editingReplyContent.trim() });
    if (result.success) {
      // Update reply in local state
      setThreadReplies(prev => ({
        ...prev,
        [parentPostId]: (prev[parentPostId] || []).map(reply =>
          reply.id === replyId ? { ...reply, content: editingReplyContent.trim() } : reply
        )
      }));
      setEditingReplyId(null);
      setEditingReplyContent('');
      setEditingReplyParentId(null);
    }
  };

  // Handle deleting a reply
  const handleDeleteReply = async (replyId, parentPostId) => {
    const result = await deleteReply(replyId);
    if (result.success) {
      // Remove reply from local state
      setThreadReplies(prev => ({
        ...prev,
        [parentPostId]: (prev[parentPostId] || []).filter(reply => reply.id !== replyId)
      }));
    }
  };

  // Format relative time for replies
  const formatRelativeTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Render inline comment composer and thread for a post
  const renderCommentSection = (post) => {
    if (!post) return null;
    
    return (
      <>
        {/* Inline Comment Composer */}
        {activeCommentPostId === post.id && (
          <div className="inline-comment-composer">
            <div className="comment-input-wrapper">
              <textarea
                className="comment-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => {
                  setCommentText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                rows={1}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit(post.id);
                  }
                  if (e.key === 'Escape') {
                    setActiveCommentPostId(null);
                    setCommentText('');
                  }
                }}
              />
            </div>
            <button 
              className="comment-submit-btn"
              disabled={!commentText.trim()}
              onClick={() => handleCommentSubmit(post.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 6 15 12 9 18"/>
              </svg>
            </button>
          </div>
        )}

        {/* View Thread Link */}
        {post.reply_count > 0 && expandedThreadId !== post.id && (
          <button 
            className="view-thread-btn"
            onClick={() => toggleThread(post.id)}
          >
            <span className="thread-line" />
            View {post.reply_count} {post.reply_count === 1 ? 'reply' : 'replies'}
          </button>
        )}

        {/* Thread Replies */}
        {expandedThreadId === post.id && (
          <div className="thread-view">
            <button 
              className="collapse-thread-btn"
              onClick={() => setExpandedThreadId(null)}
            >
              Hide replies
            </button>
            
            {loadingThread === post.id ? (
              <div className="thread-loading">Loading replies...</div>
            ) : (
              <div className="thread-replies">
                {(() => {
                  const allReplies = threadReplies[post.id] || [];
                  const visibleReplies = showAllReplies[post.id] ? allReplies : allReplies.slice(0, 3);
                  const hasMore = allReplies.length > 3;
                  
                  return (
                    <>
                      {visibleReplies.map((reply) => (
                        <div key={reply.id} className="thread-reply">
                          <div className="thread-connector">
                            <div className="thread-line-vertical" />
                          </div>
                          <div className="reply-card">
                            <div className="reply-header">
                              <div className="reply-avatar">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                </svg>
                              </div>
                              <span className="reply-author">{reply.author?.username || 'User'}</span>
                              <span className="reply-time">{formatRelativeTime(reply.created_at)}</span>
                              {/* Edit/Delete for reply owner */}
                              {currentUser && reply.author?.id === currentUser.id && (
                                <div className="reply-actions">
                                  <button 
                                    className="reply-action-btn"
                                    title="Edit"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingReplyId(reply.id);
                                      setEditingReplyContent(reply.content);
                                      setEditingReplyParentId(post.id);
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                  </button>
                                  <button 
                                    className="reply-action-btn reply-action-btn--delete"
                                    title="Delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteModalPostId(reply.id);
                                      setDeleteModalIsReply(true);
                                      setEditingReplyParentId(post.id);
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <polyline points="3 6 5 6 21 6"/>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                            {/* Reply content - edit mode or display */}
                            {editingReplyId === reply.id ? (
                              <div className="reply-edit-form">
                                <textarea
                                  className="reply-edit-input"
                                  value={editingReplyContent}
                                  onChange={(e) => setEditingReplyContent(e.target.value)}
                                  autoFocus
                                />
                                <div className="reply-edit-actions">
                                  <button 
                                    className="reply-edit-btn reply-edit-btn--cancel"
                                    onClick={() => {
                                      setEditingReplyId(null);
                                      setEditingReplyContent('');
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button 
                                    className="reply-edit-btn reply-edit-btn--save"
                                    onClick={() => handleEditReply(reply.id, post.id)}
                                    disabled={!editingReplyContent.trim()}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="reply-content">{reply.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      {hasMore && !showAllReplies[post.id] && (
                        <button 
                          className="show-more-replies-btn"
                          onClick={() => setShowAllReplies(prev => ({ ...prev, [post.id]: true }))}
                        >
                          Show {allReplies.length - 3} more replies
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="timeline-river">
      {/* Mobile Category Tabs - visible only on mobile */}
      <div className="mobile-category-tabs">
        <button 
          className={`mobile-category-tab ${mobileCategory === 'thoughts' ? 'active' : ''}`}
          onClick={() => setMobileCategory('thoughts')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Thoughts</span>
        </button>
        <button 
          className={`mobile-category-tab ${mobileCategory === 'media' ? 'active' : ''}`}
          onClick={() => setMobileCategory('media')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Media</span>
        </button>
        <button 
          className={`mobile-category-tab ${mobileCategory === 'milestones' ? 'active' : ''}`}
          onClick={() => setMobileCategory('milestones')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Milestones</span>
        </button>
      </div>

      {/* River Column Labels */}
      <div className="river-labels">
        <div className="river-label left-label">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Thoughts</span>
        </div>
        <div className="river-label center-label">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Media</span>
        </div>
        <div className="river-label right-label">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <span>Milestones</span>
        </div>
      </div>

      {/* MY TIMELINE MODE - User's own posts with carousel navigation */}
      {viewMode === 'timeline' && (
        <div className={`river-streams mobile-show-${mobileCategory}`}>
          {/* Thoughts Column */}
          <div className="river-column left-stream" data-category="thoughts">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Thoughts</span>
            </div>
            {textPosts.length > 0 ? (
              <>
                <div className="river-card text-card">
                  <div className="river-card-content">
                    <p className="river-post-text">{textPosts[getDeckIndex('me', 'thoughts')]?.content}</p>
                    <span className="river-timestamp">{formatDate(textPosts[getDeckIndex('me', 'thoughts')]?.created_at)}</span>
                  </div>
                  {/* Use standardized action buttons */}
                  {renderMyPostActions(textPosts[getDeckIndex('me', 'thoughts')])}
                  {/* Comment section */}
                  {renderCommentSection(textPosts[getDeckIndex('me', 'thoughts')])}
                </div>
                {textPosts.length > 1 && (
                  <div className="smart-deck-nav">
                    <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'thoughts', textPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <div className="smart-deck-dots">
                      {textPosts.map((_, idx) => (
                        <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'thoughts') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-thoughts']: idx}))} />
                      ))}
                    </div>
                    <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'thoughts', textPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                )}
              </>
            ) : <div className="empty-column">No thoughts yet</div>}
          </div>

          {/* Media Column */}
          <div className="river-column center-stream" data-category="media">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Media</span>
            </div>
            {mediaPosts.length > 0 ? (
              <>
                <div className="river-card media-card">
                  <div 
                    className="river-card-media clickable"
                    onClick={() => mediaPosts[getDeckIndex('me', 'media')]?.media_url && setExpandedMediaPost(mediaPosts[getDeckIndex('me', 'media')])}
                    style={{ cursor: mediaPosts[getDeckIndex('me', 'media')]?.media_url ? 'pointer' : 'default' }}
                  >
                    {mediaPosts[getDeckIndex('me', 'media')]?.media_url ? (
                      <>
                        <img src={mediaPosts[getDeckIndex('me', 'media')].media_url} alt="" className="media-image" />
                        <div className="media-expand-hint">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="media-placeholder">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="river-card-content">
                    <p className="river-post-text">{mediaPosts[getDeckIndex('me', 'media')]?.content}</p>
                    <span className="river-timestamp">{formatDate(mediaPosts[getDeckIndex('me', 'media')]?.created_at)}</span>
                  </div>
                  {/* Use standardized action buttons */}
                  {renderMyPostActions(mediaPosts[getDeckIndex('me', 'media')])}
                  {/* Comment section */}
                  {renderCommentSection(mediaPosts[getDeckIndex('me', 'media')])}
                </div>
                {mediaPosts.length > 1 && (
                  <div className="smart-deck-nav">
                    <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'media', mediaPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <div className="smart-deck-dots">
                      {mediaPosts.map((_, idx) => (
                        <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'media') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-media']: idx}))} />
                      ))}
                    </div>
                    <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'media', mediaPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                )}
              </>
            ) : <div className="empty-column">No media yet</div>}
          </div>

          {/* Milestones Column */}
          <div className="river-column right-stream" data-category="milestones">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Milestones</span>
            </div>
            {achievementPosts.length > 0 ? (
              <>
                <div className="river-card achievement-card">
                  <div className="achievement-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <div className="river-card-content">
                    <p className="river-post-text">{achievementPosts[getDeckIndex('me', 'milestones')]?.content}</p>
                    <span className="river-timestamp">{formatDate(achievementPosts[getDeckIndex('me', 'milestones')]?.created_at)}</span>
                  </div>
                  {/* Use standardized action buttons */}
                  {renderMyPostActions(achievementPosts[getDeckIndex('me', 'milestones')])}
                  {/* Comment section */}
                  {renderCommentSection(achievementPosts[getDeckIndex('me', 'milestones')])}
                </div>
                {achievementPosts.length > 1 && (
                  <div className="smart-deck-nav">
                    <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'milestones', achievementPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <div className="smart-deck-dots">
                      {achievementPosts.map((_, idx) => (
                        <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'milestones') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-milestones']: idx}))} />
                      ))}
                    </div>
                    <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'milestones', achievementPosts.length)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                  </div>
                )}
              </>
            ) : <div className="empty-column">No milestones yet</div>}
          </div>
        </div>
      )}

      {/* FRIENDS FEED MODE - Each friend in their own row */}
      {viewMode === 'feed' && (
        <div className="friends-feed-rows">
          {friendsGrouped.map((friend) => (
            <div key={friend.username} className="friend-row">
              <div 
                className="friend-row-header clickable-friend"
                onClick={() => navigate(`/profile/${friend.username}`)}
                title={`View ${friend.username}'s profile`}
              >
                <div className="friend-avatar">{friend.avatar}</div>
                <span className="friend-name">{friend.username}</span>
              </div>
              <div className={`river-streams mobile-show-${mobileCategory}`}>
                <div className="river-column left-stream" data-category="thoughts">
                  {friend.thoughts.length > 0 ? (
                    <>
                      <div className="river-card text-card">
                        <div className="river-card-content">
                          <p className="river-post-text">{friend.thoughts[getDeckIndex(friend.username, 'thoughts')]?.content}</p>
                          <span className="river-timestamp">{formatDate(friend.thoughts[getDeckIndex(friend.username, 'thoughts')]?.created_at)}</span>
                        </div>
                        {/* Action buttons for friend's thought */}
                        {renderFriendPostActions(friend.thoughts[getDeckIndex(friend.username, 'thoughts')])}
                        {/* Comment section */}
                        {renderCommentSection(friend.thoughts[getDeckIndex(friend.username, 'thoughts')])}
                      </div>
                      {friend.thoughts.length > 1 && (
                        <div className="smart-deck-nav">
                          <button className="smart-deck-nav-btn" onClick={() => prevCard(friend.username, 'thoughts', friend.thoughts.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                          </button>
                          {friend.thoughts.length <= 5 ? (
                            <div className="smart-deck-dots">
                              {friend.thoughts.map((_, idx) => (
                                <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex(friend.username, 'thoughts') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, [`${friend.username}-thoughts`]: idx}))} />
                              ))}
                            </div>
                          ) : (
                            <span className="smart-deck-count">{getDeckIndex(friend.username, 'thoughts') + 1}/{friend.thoughts.length}</span>
                          )}
                          <button className="smart-deck-nav-btn" onClick={() => nextCard(friend.username, 'thoughts', friend.thoughts.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        </div>
                      )}
                    </>
                  ) : <div className="empty-column">No thoughts</div>}
                </div>
                <div className="river-column center-stream">
                  {friend.media.length > 0 ? (
                    <>
                      <div className="river-card media-card">
                        <div className="river-card-media">
                          {friend.media[getDeckIndex(friend.username, 'media')]?.media_url ? (
                            <img src={friend.media[getDeckIndex(friend.username, 'media')].media_url} alt="" className="media-image" />
                          ) : (
                            <div className="media-placeholder">
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="river-card-content">
                          <p className="river-post-text">{friend.media[getDeckIndex(friend.username, 'media')]?.content}</p>
                          <span className="river-timestamp">{formatDate(friend.media[getDeckIndex(friend.username, 'media')]?.created_at)}</span>
                        </div>
                        {/* Action buttons for friend's media */}
                        {renderFriendPostActions(friend.media[getDeckIndex(friend.username, 'media')])}
                        {/* Comment section */}
                        {renderCommentSection(friend.media[getDeckIndex(friend.username, 'media')])}
                      </div>
                      {friend.media.length > 1 && (
                        <div className="smart-deck-nav">
                          <button className="smart-deck-nav-btn" onClick={() => prevCard(friend.username, 'media', friend.media.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                          </button>
                          {friend.media.length <= 5 ? (
                            <div className="smart-deck-dots">
                              {friend.media.map((_, idx) => (
                                <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex(friend.username, 'media') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, [`${friend.username}-media`]: idx}))} />
                              ))}
                            </div>
                          ) : (
                            <span className="smart-deck-count">{getDeckIndex(friend.username, 'media') + 1}/{friend.media.length}</span>
                          )}
                          <button className="smart-deck-nav-btn" onClick={() => nextCard(friend.username, 'media', friend.media.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        </div>
                      )}
                    </>
                  ) : <div className="empty-column">No media</div>}
                </div>
                <div className="river-column right-stream">
                  {friend.milestones.length > 0 ? (
                    <>
                      <div className="river-card achievement-card">
                        <div className="achievement-badge">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                        </div>
                        <div className="river-card-content">
                          <p className="river-post-text">{friend.milestones[getDeckIndex(friend.username, 'milestones')]?.content}</p>
                          <span className="river-timestamp">{formatDate(friend.milestones[getDeckIndex(friend.username, 'milestones')]?.created_at)}</span>
                        </div>
                        {/* Action buttons for friend's milestone */}
                        {renderFriendPostActions(friend.milestones[getDeckIndex(friend.username, 'milestones')])}
                        {/* Comment section */}
                        {renderCommentSection(friend.milestones[getDeckIndex(friend.username, 'milestones')])}
                      </div>
                      {friend.milestones.length > 1 && (
                        <div className="smart-deck-nav">
                          <button className="smart-deck-nav-btn" onClick={() => prevCard(friend.username, 'milestones', friend.milestones.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                          </button>
                          {friend.milestones.length <= 5 ? (
                            <div className="smart-deck-dots">
                              {friend.milestones.map((_, idx) => (
                                <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex(friend.username, 'milestones') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, [`${friend.username}-milestones`]: idx}))} />
                              ))}
                            </div>
                          ) : (
                            <span className="smart-deck-count">{getDeckIndex(friend.username, 'milestones') + 1}/{friend.milestones.length}</span>
                          )}
                          <button className="smart-deck-nav-btn" onClick={() => nextCard(friend.username, 'milestones', friend.milestones.length)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        </div>
                      )}
                    </>
                  ) : <div className="empty-column">No milestones</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalPostId && (
        <DeleteConfirmModal
          isOpen={!!deleteModalPostId}
          onClose={() => {
            setDeleteModalPostId(null);
            setDeleteModalIsReply(false);
            setEditingReplyParentId(null);
          }}
          onConfirm={async () => {
            setIsDeleting(true);
            try {
              if (deleteModalIsReply) {
                // Deleting a reply/comment
                await deletePost(deleteModalPostId);
                // Update thread replies
                if (editingReplyParentId) {
                  setThreadReplies(prev => ({
                    ...prev,
                    [editingReplyParentId]: (prev[editingReplyParentId] || []).filter(r => r.id !== deleteModalPostId)
                  }));
                }
              } else if (onDeletePost) {
                // Deleting a post
                await onDeletePost(deleteModalPostId);
              }
              setDeleteModalPostId(null);
              setDeleteModalIsReply(false);
              setEditingReplyParentId(null);
            } catch (error) {
              console.error('Failed to delete:', error);
            } finally {
              setIsDeleting(false);
            }
          }}
          isDeleting={isDeleting}
          title={deleteModalIsReply ? "Delete Comment" : "Delete Post"}
          message={deleteModalIsReply ? "Are you sure you want to delete this comment? This action cannot be undone." : undefined}
        />
      )}

      {/* Edit Modal (Expanded Composer) */}
      {isComposerExpanded && isEditMode && createPortal(
        <div className="expanded-composer-overlay" onClick={() => {
          setIsComposerExpanded(false);
          setIsEditMode(false);
          setEditingPostId(null);
          setCommentText('');
        }}>
          <div className="expanded-composer-modal edit-mode" onClick={(e) => e.stopPropagation()}>
            <div className="expanded-composer-header">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Post
              </h3>
              <button 
                className="close-btn-glow"
                onClick={() => {
                  setIsComposerExpanded(false);
                  setIsEditMode(false);
                  setEditingPostId(null);
                  setCommentText('');
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="expanded-composer-body">
              <textarea
                className="composer-textarea"
                placeholder="Edit your post..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                autoFocus
              />
            </div>
            <div className="expanded-composer-footer">
              <button 
                className="submit-btn icon-btn"
                disabled={!commentText.trim()}
                onClick={async () => {
                  if (commentText.trim() && editingPostId && onUpdatePost) {
                    try {
                      await onUpdatePost(editingPostId, { content: commentText.trim() });
                      setIsComposerExpanded(false);
                      setIsEditMode(false);
                      setEditingPostId(null);
                      setCommentText('');
                    } catch (error) {
                      console.error('Failed to update post:', error);
                    }
                  }
                }}
                title="Save"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Media Lightbox */}
      <MediaLightbox 
        post={expandedMediaPost ? (allPosts.find(p => p.id === expandedMediaPost.id) || expandedMediaPost) : null}
        onClose={() => setExpandedMediaPost(null)}
        commentText={commentText}
        setCommentText={setCommentText}
      />
    </div>
  );
}

export default TimelineRiver;