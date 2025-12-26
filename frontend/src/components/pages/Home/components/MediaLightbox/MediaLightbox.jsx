// 🔵 PABLO - UI Architect
// MediaLightbox.jsx - Fullscreen media viewer modal

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePosts } from '../../../../../contexts/PostsContext';
import { useAuth } from '../../../../../contexts/AuthContext';
import './MediaLightbox.scss';

function MediaLightbox({ post, onClose, commentText, setCommentText }) {
  const { likePost, sharePost, createReply, updatePost, deletePost } = usePosts();
  const { user: currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localReplies, setLocalReplies] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State for editing/deleting comments
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  
  if (!post) return null;

  const handleLike = async (e) => {
    e.stopPropagation();
    await likePost(post.id);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    await sharePost(post.id);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const result = await createReply(post.id, { content: commentText.trim(), type: 'thoughts' });
    setIsSubmitting(false);
    
    if (result.success) {
      // Add to local replies to show immediately
      setLocalReplies(prev => [...prev, result.data]);
      setCommentText('');
      const textarea = document.querySelector('.lightbox-comment-input');
      if (textarea) textarea.style.height = 'auto';
    }
  };

  // Handle comment edit
  const handleEditComment = async (commentId) => {
    if (!editingCommentContent.trim()) return;
    setIsSubmitting(true);
    const result = await updatePost(commentId, { content: editingCommentContent.trim() });
    setIsSubmitting(false);
    if (result.success) {
      setLocalReplies(prev => prev.map(r => r.id === commentId ? { ...r, content: editingCommentContent.trim() } : r));
      setEditingCommentId(null);
      setEditingCommentContent('');
    }
  };

  // Handle comment delete
  const handleDeleteComment = async (commentId) => {
    setIsSubmitting(true);
    const result = await deletePost(commentId);
    setIsSubmitting(false);
    if (result.success) {
      setLocalReplies(prev => prev.filter(r => r.id !== commentId));
      setDeletingCommentId(null);
    }
  };

  // Use React Portal to render at document body level
  // This ensures the lightbox escapes all parent overflow/transform constraints
  return createPortal(
    <div className={`media-lightbox-overlay ${isExpanded ? 'is-expanded' : ''}`} onClick={onClose}>
      <div className={`media-lightbox-content ${isExpanded ? 'is-expanded' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Expand Toggle Button */}
        <button 
          className="expand-toggle-btn" 
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse' : 'Expand to fullscreen'}
        >
          {isExpanded ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          )}
        </button>
        
        <button className="close-btn-glow" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        
        <div className="media-lightbox-image-container">
          <img src={post.media_url} alt="Expanded media" className="media-lightbox-image" />
        </div>
        
        <div className="media-lightbox-info">
          <div className="media-lightbox-header">
            <div className="river-avatar">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <div>
              <div className="media-lightbox-author">
                {post.author?.username || post.author || 'Unknown'}
              </div>
              <div className="media-lightbox-timestamp">{post.timestamp}</div>
            </div>
          </div>
          
          <p className="media-lightbox-caption">{post.content}</p>
          
          {/* Compact Action Bar */}
          <div className="media-lightbox-actions">
            <button 
              className={`media-action-btn media-action-btn--like ${post.is_liked ? 'media-action-btn--liked' : ''}`}
              onClick={handleLike}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                      fill={post.is_liked ? "#3b82f6" : "none"} 
                      stroke={post.is_liked ? "#3b82f6" : "rgba(201,168,255,0.5)"} 
                      strokeWidth="1.5"/>
              </svg>
              <span className="action-count">{post.likes_count || 0}</span>
            </button>
            <button className="media-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="action-count">{post.comment_count || 0}</span>
            </button>
            <button className="media-action-btn" onClick={handleShare}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              <span className="action-count">{post.shares_count || 0}</span>
            </button>
            <button className="media-action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>
          </div>

          {/* Comment Section in Lightbox */}
          <div className="media-lightbox-comments">
            <div className="lightbox-comments-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Comments</span>
            </div>
            
            {/* Compact Comment Composer - send button inside input */}
            <div className="lightbox-comment-composer">
              <div className="lightbox-comment-input-wrapper">
                <textarea
                  className="lightbox-comment-input"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                  }}
                  rows={1}
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit();
                    }
                  }}
                />
                <button 
                  className="lightbox-comment-submit-btn"
                  disabled={!commentText.trim() || isSubmitting}
                  onClick={handleCommentSubmit}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 6 15 12 9 18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Comments List - shows real replies */}
            <div className="lightbox-comments-list">
              {/* Show post's existing replies if any */}
              {post.replies && post.replies.length > 0 && post.replies.map(reply => {
                const isOwnComment = currentUser && reply.author?.id === currentUser.id;
                const isEditingThis = editingCommentId === reply.id;
                
                return (
                  <div key={reply.id} className={`lightbox-comment-item ${isEditingThis ? 'is-editing' : ''}`}>
                    <div className="comment-composer-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="lightbox-comment-content">
                      <div className="lightbox-comment-header">
                        <div className="lightbox-comment-author">{reply.author?.username || 'User'}</div>
                        {isOwnComment && !isEditingThis && (
                          <div className="lightbox-comment-actions">
                            <button 
                              className="comment-action-btn" 
                              title="Edit"
                              onClick={() => {
                                setEditingCommentId(reply.id);
                                setEditingCommentContent(reply.content);
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button 
                              className="comment-action-btn comment-action-btn--delete" 
                              title="Delete"
                              onClick={() => setDeletingCommentId(reply.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {isEditingThis ? (
                        <div className="comment-edit-form">
                          <textarea
                            className="comment-edit-input"
                            value={editingCommentContent}
                            onChange={(e) => setEditingCommentContent(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleEditComment(reply.id);
                              }
                              if (e.key === 'Escape') {
                                setEditingCommentId(null);
                                setEditingCommentContent('');
                              }
                            }}
                          />
                          <div className="comment-edit-actions">
                            <button 
                              className="comment-edit-btn comment-edit-btn--cancel"
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditingCommentContent('');
                              }}
                            >
                              Cancel
                            </button>
                            <button 
                              className="comment-edit-btn comment-edit-btn--save"
                              disabled={!editingCommentContent.trim() || isSubmitting}
                              onClick={() => handleEditComment(reply.id)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="lightbox-comment-text">{reply.content}</div>
                      )}
                      <div className="lightbox-comment-meta">
                        {reply.created_at ? new Date(reply.created_at).toLocaleDateString() : 'Just now'}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Show locally added replies (before page refresh) */}
              {localReplies.map(reply => {
                const isEditingThis = editingCommentId === reply.id;
                
                return (
                  <div key={reply.id} className={`lightbox-comment-item lightbox-comment-item--new ${isEditingThis ? 'is-editing' : ''}`}>
                    <div className="comment-composer-avatar">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="lightbox-comment-content">
                      <div className="lightbox-comment-header">
                        <div className="lightbox-comment-author">{reply.author?.username || 'You'}</div>
                        {!isEditingThis && (
                          <div className="lightbox-comment-actions">
                            <button 
                              className="comment-action-btn" 
                              title="Edit"
                              onClick={() => {
                                setEditingCommentId(reply.id);
                                setEditingCommentContent(reply.content);
                              }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button 
                              className="comment-action-btn comment-action-btn--delete" 
                              title="Delete"
                              onClick={() => setDeletingCommentId(reply.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                      {isEditingThis ? (
                        <div className="comment-edit-form">
                          <textarea
                            className="comment-edit-input"
                            value={editingCommentContent}
                            onChange={(e) => setEditingCommentContent(e.target.value)}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleEditComment(reply.id);
                              }
                              if (e.key === 'Escape') {
                                setEditingCommentId(null);
                                setEditingCommentContent('');
                              }
                            }}
                          />
                          <div className="comment-edit-actions">
                            <button 
                              className="comment-edit-btn comment-edit-btn--cancel"
                              onClick={() => {
                                setEditingCommentId(null);
                                setEditingCommentContent('');
                              }}
                            >
                              Cancel
                            </button>
                            <button 
                              className="comment-edit-btn comment-edit-btn--save"
                              disabled={!editingCommentContent.trim() || isSubmitting}
                              onClick={() => handleEditComment(reply.id)}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="lightbox-comment-text">{reply.content}</div>
                      )}
                      <div className="lightbox-comment-meta">Just now</div>
                    </div>
                  </div>
                );
              })}
              
              {/* Empty state */}
              {(!post.replies || post.replies.length === 0) && localReplies.length === 0 && (
                <div className="lightbox-comments-empty">
                  No comments yet. Be the first!
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Delete Comment Confirmation Modal */}
        {deletingCommentId && (
          <div className="lightbox-delete-overlay" onClick={() => setDeletingCommentId(null)}>
            <div className="lightbox-delete-modal" onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-delete-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.8)" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </div>
              <h3 className="lightbox-delete-title">Delete Comment?</h3>
              <p className="lightbox-delete-text">This action cannot be undone.</p>
              <div className="lightbox-delete-actions">
                <button 
                  className="lightbox-delete-btn lightbox-delete-btn--cancel"
                  onClick={() => setDeletingCommentId(null)}
                >
                  Cancel
                </button>
                <button 
                  className="lightbox-delete-btn lightbox-delete-btn--delete"
                  disabled={isSubmitting}
                  onClick={() => handleDeleteComment(deletingCommentId)}
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default MediaLightbox;
