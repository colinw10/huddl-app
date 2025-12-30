// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Posts Data
// TimelineRiver.jsx - Profile timeline showing user's posts in river format

import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './TimelineRiver.scss';
import {
  HeartDynamicIcon,
  MessageBubbleIcon,
  RepostIcon,
  BookmarkIcon,
  EditIcon,
  TrashIcon,
  MessageLineIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  ExpandIcon,
  MilestoneIcon,
  CloseIcon,
  CheckIcon
} from '../../../../../assets/icons';
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
  isOwnProfile = true, // Default to own profile for backwards compatibility
  profileUser // The user whose profile we're viewing
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
          <HeartDynamicIcon 
            size={18} 
            filled={post.is_liked}
            fillColor="#3b82f6"
            strokeColor={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"}
          />
          {post.likes_count || 0}
        </div>
        
        {/* Comment button */}
        <button 
          className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''}`}
          title="Comment"
          onClick={() => handleCommentClick(post.id)}
        >
          <MessageBubbleIcon size={18} stroke="rgba(201,168,255,0.5)" strokeWidth="1.5" />
          {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
        </button>
        
        {/* Share/Repost button */}
        <button className="river-action-btn" title="Repost">
          <RepostIcon size={18} stroke="rgba(79,255,255,0.5)" />
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
          <MessageLineIcon size={18} stroke="rgba(0,212,255,0.5)" />
        </button>
        
        {/* Bookmark button */}
        <button className="river-action-btn" title="Bookmark">
          <BookmarkIcon size={18} stroke="rgba(201,168,255,0.5)" strokeWidth="1.5" />
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
          <HeartDynamicIcon size={18} filled={post.is_liked} />
          {post.likes_count || 0}
        </div>
        
        {/* Comment button */}
        <button 
          className={`river-action-btn ${post.reply_count > 0 ? 'has-replies' : ''}`}
          title="Comment"
          onClick={() => handleCommentClick(post.id)}
        >
          <MessageBubbleIcon size={18} stroke="rgba(201,168,255,0.5)" strokeWidth="1.5" />
          {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
        </button>
        
        {/* Share/Repost button */}
        <button className="river-action-btn" title="Share">
          <RepostIcon size={18} stroke="rgba(79,255,255,0.5)" />
        </button>
        
        {/* Save/Bookmark button - ONLY on other user's profile */}
        {!isOwnProfile && (
          <button className="river-action-btn river-action-btn--save" title="Save Post">
            <BookmarkIcon size={18} stroke="rgba(167,131,255,0.6)" strokeWidth="1.5" />
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
            <EditIcon size={18} stroke="rgba(255,193,7,0.6)" strokeWidth="1.5" />
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
            <TrashIcon size={18} stroke="rgba(255,82,82,0.6)" strokeWidth="1.5" />
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
              <ChevronRightIcon size={20} strokeWidth="2.5" />
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
                                <UserIcon size={14} />
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
                                    <EditIcon size={14} />
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
                                    <TrashIcon size={14} />
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
      {/* Mobile Category Tabs - visible only on mobile, only for My Timeline */}
      {viewMode === 'timeline' && (
        <div className="mobile-category-tabs">
          <button 
            className={`mobile-category-tab ${mobileCategory === 'thoughts' ? 'active' : ''}`}
            onClick={() => setMobileCategory('thoughts')}
          >
            <MessageBubbleIcon size={18} />
            <span>Thoughts</span>
          </button>
          <button 
            className={`mobile-category-tab ${mobileCategory === 'media' ? 'active' : ''}`}
            onClick={() => setMobileCategory('media')}
          >
            <ImageIcon size={18} />
            <span>Media</span>
          </button>
          <button 
            className={`mobile-category-tab ${mobileCategory === 'milestones' ? 'active' : ''}`}
            onClick={() => setMobileCategory('milestones')}
          >
            <MilestoneIcon size={18} />
            <span>Milestones</span>
          </button>
        </div>
      )}

      {/* River Column Labels - only for My Timeline */}
      {viewMode === 'timeline' && (
        <div className="river-labels">
          <div className="river-label left-label">
            <MessageBubbleIcon size={20} />
            <span>Thoughts</span>
          </div>
          <div className="river-label center-label">
            <ImageIcon size={20} />
            <span>Media</span>
          </div>
          <div className="river-label right-label">
            <MilestoneIcon size={20} />
            <span>Milestones</span>
          </div>
        </div>
      )}

      {/* MY TIMELINE MODE - User's own posts */}
      {viewMode === 'timeline' && (() => {
        // Split posts: first 12 for carousel, rest displayed as full river
        const CAROUSEL_LIMIT = 12;
        const carouselThoughts = textPosts.slice(0, CAROUSEL_LIMIT);
        const riverThoughts = textPosts.slice(CAROUSEL_LIMIT);
        const carouselMedia = mediaPosts.slice(0, CAROUSEL_LIMIT);
        const riverMedia = mediaPosts.slice(CAROUSEL_LIMIT);
        const carouselMilestones = achievementPosts.slice(0, CAROUSEL_LIMIT);
        const riverMilestones = achievementPosts.slice(CAROUSEL_LIMIT);
        const hasRiverPosts = riverThoughts.length > 0 || riverMedia.length > 0 || riverMilestones.length > 0;

        return (
          <>
            {/* CAROUSEL SECTION - First 12 posts per category with carousel nav */}
            <div className={`river-streams mobile-show-${mobileCategory}`}>
              {/* Thoughts Column */}
              <div className="river-column left-stream" data-category="thoughts">
                <div className="river-column-label mobile-only">
                  <MessageBubbleIcon size={18} />
                  <span>Thoughts</span>
                </div>
                {carouselThoughts.length > 0 ? (
                  <>
                    <div className="river-card text-card">
                      {/* User header inside card */}
                      <div className="river-card-author">
                        <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                        <span className="friend-name">{profileUser?.username || 'User'}</span>
                      </div>
                      <div className="river-card-content">
                        <p className="river-post-text">{carouselThoughts[getDeckIndex('me', 'thoughts')]?.content}</p>
                        <span className="river-timestamp">{formatDate(carouselThoughts[getDeckIndex('me', 'thoughts')]?.created_at)}</span>
                      </div>
                      {renderMyPostActions(carouselThoughts[getDeckIndex('me', 'thoughts')])}
                      {renderCommentSection(carouselThoughts[getDeckIndex('me', 'thoughts')])}
                    </div>
                    {carouselThoughts.length > 1 && (
                      <div className="smart-deck-nav">
                        <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'thoughts', carouselThoughts.length)}>
                          <ChevronLeftIcon size={16} />
                        </button>
                        <div className="smart-deck-dots">
                          {carouselThoughts.map((_, idx) => (
                            <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'thoughts') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-thoughts']: idx}))} />
                          ))}
                        </div>
                        <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'thoughts', carouselThoughts.length)}>
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    )}
                  </>
                ) : <div className="empty-column">No thoughts yet</div>}
              </div>

              {/* Media Column */}
              <div className="river-column center-stream" data-category="media">
                <div className="river-column-label mobile-only">
                  <ImageIcon size={18} />
                  <span>Media</span>
                </div>
                {carouselMedia.length > 0 ? (
                  <>
                    <div className="river-card media-card">
                      {/* User header inside card */}
                      <div className="river-card-author">
                        <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                        <span className="friend-name">{profileUser?.username || 'User'}</span>
                      </div>
                      <div 
                        className="river-card-media clickable"
                        onClick={() => carouselMedia[getDeckIndex('me', 'media')]?.media_url && setExpandedMediaPost(carouselMedia[getDeckIndex('me', 'media')])}
                        style={{ cursor: carouselMedia[getDeckIndex('me', 'media')]?.media_url ? 'pointer' : 'default' }}
                      >
                        {carouselMedia[getDeckIndex('me', 'media')]?.media_url ? (
                          <>
                            <img src={carouselMedia[getDeckIndex('me', 'media')].media_url} alt="" className="media-image" />
                            <div className="media-expand-hint">
                              <ExpandIcon size={20} />
                            </div>
                          </>
                        ) : (
                          <div className="media-placeholder">
                            <ImageIcon size={40} strokeWidth="1.5" />
                          </div>
                        )}
                      </div>
                      <div className="river-card-content">
                        <p className="river-post-text">{carouselMedia[getDeckIndex('me', 'media')]?.content}</p>
                        <span className="river-timestamp">{formatDate(carouselMedia[getDeckIndex('me', 'media')]?.created_at)}</span>
                      </div>
                      {renderMyPostActions(carouselMedia[getDeckIndex('me', 'media')])}
                      {renderCommentSection(carouselMedia[getDeckIndex('me', 'media')])}
                    </div>
                    {carouselMedia.length > 1 && (
                      <div className="smart-deck-nav">
                        <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'media', carouselMedia.length)}>
                          <ChevronLeftIcon size={16} />
                        </button>
                        <div className="smart-deck-dots">
                          {carouselMedia.map((_, idx) => (
                            <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'media') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-media']: idx}))} />
                          ))}
                        </div>
                        <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'media', carouselMedia.length)}>
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    )}
                  </>
                ) : <div className="empty-column">No media yet</div>}
              </div>

              {/* Milestones Column */}
              <div className="river-column right-stream" data-category="milestones">
                <div className="river-column-label mobile-only">
                  <MilestoneIcon size={18} />
                  <span>Milestones</span>
                </div>
                {carouselMilestones.length > 0 ? (
                  <>
                    <div className="river-card achievement-card">
                      {/* User header inside card */}
                      <div className="river-card-author">
                        <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                        <span className="friend-name">{profileUser?.username || 'User'}</span>
                      </div>
                      <div className="achievement-badge">
                        <MilestoneIcon size={24} />
                      </div>
                      <div className="river-card-content">
                        <p className="river-post-text">{carouselMilestones[getDeckIndex('me', 'milestones')]?.content}</p>
                        <span className="river-timestamp">{formatDate(carouselMilestones[getDeckIndex('me', 'milestones')]?.created_at)}</span>
                      </div>
                      {renderMyPostActions(carouselMilestones[getDeckIndex('me', 'milestones')])}
                      {renderCommentSection(carouselMilestones[getDeckIndex('me', 'milestones')])}
                    </div>
                    {carouselMilestones.length > 1 && (
                      <div className="smart-deck-nav">
                        <button className="smart-deck-nav-btn" onClick={() => prevCard('me', 'milestones', carouselMilestones.length)}>
                          <ChevronLeftIcon size={16} />
                        </button>
                        <div className="smart-deck-dots">
                          {carouselMilestones.map((_, idx) => (
                            <span key={idx} className={`smart-deck-dot ${idx === getDeckIndex('me', 'milestones') ? 'smart-deck-dot--active' : ''}`} onClick={() => setDeckIndices(prev => ({...prev, ['me-milestones']: idx}))} />
                          ))}
                        </div>
                        <button className="smart-deck-nav-btn" onClick={() => nextCard('me', 'milestones', carouselMilestones.length)}>
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    )}
                  </>
                ) : <div className="empty-column">No milestones yet</div>}
              </div>
            </div>

            {/* RIVER CONTINUATION - All remaining posts (after first 12) as ROWS */}
            {hasRiverPosts && (
              <div className="river-continuation">
                {/* Each row shows one card from each category at the same index */}
                {Array.from({ length: Math.max(riverThoughts.length, riverMedia.length, riverMilestones.length) }).map((_, rowIndex) => (
                  <div key={rowIndex} className="river-streams">
                    {/* Thoughts Column */}
                    <div className="river-column left-stream">
                      {riverThoughts[rowIndex] && (
                        <div className="river-card text-card">
                          {/* User header inside card */}
                          <div className="river-card-author">
                            <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                            <span className="friend-name">{profileUser?.username || 'User'}</span>
                          </div>
                          <div className="river-card-content">
                            <p className="river-post-text">{riverThoughts[rowIndex].content}</p>
                            <span className="river-timestamp">{formatDate(riverThoughts[rowIndex].created_at)}</span>
                          </div>
                          {renderMyPostActions(riverThoughts[rowIndex])}
                          {renderCommentSection(riverThoughts[rowIndex])}
                        </div>
                      )}
                    </div>
                    
                    {/* Media Column */}
                    <div className="river-column center-stream">
                      {riverMedia[rowIndex] && (
                        <div className="river-card media-card">
                          {/* User header inside card */}
                          <div className="river-card-author">
                            <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                            <span className="friend-name">{profileUser?.username || 'User'}</span>
                          </div>
                          <div 
                            className="river-card-media clickable"
                            onClick={() => riverMedia[rowIndex].media_url && setExpandedMediaPost(riverMedia[rowIndex])}
                            style={{ cursor: riverMedia[rowIndex].media_url ? 'pointer' : 'default' }}
                          >
                            {riverMedia[rowIndex].media_url ? (
                              <>
                                <img src={riverMedia[rowIndex].media_url} alt="" className="media-image" />
                                <div className="media-expand-hint">
                                  <ExpandIcon size={20} />
                                </div>
                              </>
                            ) : (
                              <div className="media-placeholder">
                                <ImageIcon size={40} strokeWidth="1.5" />
                              </div>
                            )}
                          </div>
                          <div className="river-card-content">
                            <p className="river-post-text">{riverMedia[rowIndex].content}</p>
                            <span className="river-timestamp">{formatDate(riverMedia[rowIndex].created_at)}</span>
                          </div>
                          {renderMyPostActions(riverMedia[rowIndex])}
                          {renderCommentSection(riverMedia[rowIndex])}
                        </div>
                      )}
                    </div>
                    
                    {/* Milestones Column */}
                    <div className="river-column right-stream">
                      {riverMilestones[rowIndex] && (
                        <div className="river-card achievement-card">
                          {/* User header inside card */}
                          <div className="river-card-author">
                            <div className="friend-avatar">{profileUser ? getInitials(profileUser) : '??'}</div>
                            <span className="friend-name">{profileUser?.username || 'User'}</span>
                          </div>
                          <div className="achievement-badge">
                            <MilestoneIcon size={24} />
                          </div>
                          <div className="river-card-content">
                            <p className="river-post-text">{riverMilestones[rowIndex].content}</p>
                            <span className="river-timestamp">{formatDate(riverMilestones[rowIndex].created_at)}</span>
                          </div>
                          {renderMyPostActions(riverMilestones[rowIndex])}
                          {renderCommentSection(riverMilestones[rowIndex])}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );
      })()}

      {/* FRIENDS FEED MODE - Each friend in their own row */}
      {viewMode === 'feed' && (
        <div className="friends-feed-rows">
          {/* Mobile Category Tabs for Friends Feed */}
          <div className="mobile-category-tabs friends-feed-tabs">
            <button 
              className={`mobile-category-tab ${mobileCategory === 'thoughts' ? 'active' : ''}`}
              onClick={() => setMobileCategory('thoughts')}
            >
              <MessageBubbleIcon size={18} />
              <span>Thoughts</span>
            </button>
            <button 
              className={`mobile-category-tab ${mobileCategory === 'media' ? 'active' : ''}`}
              onClick={() => setMobileCategory('media')}
            >
              <ImageIcon size={18} />
              <span>Media</span>
            </button>
            <button 
              className={`mobile-category-tab ${mobileCategory === 'milestones' ? 'active' : ''}`}
              onClick={() => setMobileCategory('milestones')}
            >
              <MilestoneIcon size={18} />
              <span>Milestones</span>
            </button>
          </div>

          {/* Column Labels for Friends Feed - desktop only */}
          <div className="river-labels friends-feed-labels">
            <div className="river-label left-label">
              <MessageBubbleIcon size={20} />
              <span>Thoughts</span>
            </div>
            <div className="river-label center-label">
              <ImageIcon size={20} />
              <span>Media</span>
            </div>
            <div className="river-label right-label">
              <MilestoneIcon size={20} />
              <span>Milestones</span>
            </div>
          </div>

          {friendsGrouped.map((friend) => (
            <div key={friend.username} className="friend-row">
              <div className={`river-streams mobile-show-${mobileCategory}`}>
                <div className="river-column left-stream" data-category="thoughts">
                  {friend.thoughts.length > 0 ? (
                    <>
                      <div className="river-card text-card">
                        {/* User header inside card - matches Home feed */}
                        <div 
                          className="river-card-author clickable-friend"
                          onClick={() => navigate(`/profile/${friend.username}`)}
                          title={`View ${friend.username}'s profile`}
                        >
                          <div className="friend-avatar">{friend.avatar}</div>
                          <span className="friend-name">{friend.username}</span>
                        </div>
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
                            <ChevronLeftIcon size={16} />
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
                            <ChevronRightIcon size={16} />
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
                        {/* User header inside card - matches Home feed */}
                        <div 
                          className="river-card-author clickable-friend"
                          onClick={() => navigate(`/profile/${friend.username}`)}
                          title={`View ${friend.username}'s profile`}
                        >
                          <div className="friend-avatar">{friend.avatar}</div>
                          <span className="friend-name">{friend.username}</span>
                        </div>
                        <div className="river-card-media">
                          {friend.media[getDeckIndex(friend.username, 'media')]?.media_url ? (
                            <img src={friend.media[getDeckIndex(friend.username, 'media')].media_url} alt="" className="media-image" />
                          ) : (
                            <div className="media-placeholder">
                              <ImageIcon size={40} strokeWidth="1.5" />
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
                            <ChevronLeftIcon size={16} />
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
                            <ChevronRightIcon size={16} />
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
                        {/* User header inside card - matches Home feed */}
                        <div 
                          className="river-card-author clickable-friend"
                          onClick={() => navigate(`/profile/${friend.username}`)}
                          title={`View ${friend.username}'s profile`}
                        >
                          <div className="friend-avatar">{friend.avatar}</div>
                          <span className="friend-name">{friend.username}</span>
                        </div>
                        <div className="achievement-badge">
                          <MilestoneIcon size={24} />
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
                            <ChevronLeftIcon size={16} />
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
                            <ChevronRightIcon size={16} />
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
                <EditIcon size={20} />
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
                <CloseIcon size={24} />
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
                <CheckIcon size={24} strokeWidth="2.5" />
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