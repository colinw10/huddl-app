// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Posts Data
// TimelineRiver.jsx - Profile timeline showing user's posts in river format

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './TimelineRiver.scss';
import DeleteConfirmModal from '../../../Home/components/DeleteConfirmModal/DeleteConfirmModal';

function TimelineRiver({ 
  viewMode, 
  textPosts, 
  mediaPosts, 
  achievementPosts,
  feedTextPosts,
  feedMediaPosts,
  feedAchievementPosts,
  onDeletePost,
  onUpdatePost
}) {
  // State for inline comment composer
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // State for edit/delete
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isComposerExpanded, setIsComposerExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      console.log('Comment posted:', commentText);
      setCommentText('');
      setActiveCommentPostId(null);
    }
  };

  return (
    <div className="timeline-river">
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

      {/* River Streams Container */}
      <div className="river-streams">
        {/* Left Column - Text Posts (Thoughts) */}
        <div className="river-column left-stream">
          {(viewMode === 'timeline' ? textPosts : feedTextPosts).map((post) => (
            <div key={post.id} className="river-card text-card">
              {viewMode === 'feed' && (
                <div className="river-card-author">
                  <div className="author-avatar">{post.avatar}</div>
                  <span className="author-name">{post.author}</span>
                </div>
              )}
              <div className="river-card-content">
                <p className="river-post-text">{post.content}</p>
                <span className="river-timestamp">{post.timestamp}</span>
              </div>
              <div className="river-card-actions">
                <button className="river-action-btn" aria-label="Comment" onClick={() => handleCommentClick(post.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Repost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(79,255,255,0.5)" strokeWidth="1.5">
                    <polyline points="17 1 21 5 17 9"/>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                    <polyline points="7 23 3 19 7 15"/>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Bookmark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                {/* Edit & Delete - only for own posts in timeline mode */}
                {viewMode === 'timeline' && (
                  <>
                    <button 
                      className="river-action-btn river-action-btn--edit" 
                      aria-label="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPostId(post.id);
                        setActiveCommentPostId(post.id);
                        setCommentText(post.content);
                        setIsEditMode(true);
                        setIsComposerExpanded(true);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      className="river-action-btn river-action-btn--delete" 
                      aria-label="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModalPostId(post.id);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {/* Inline Comment Composer */}
              {activeCommentPostId === post.id && (
                <div className="inline-comment-composer">
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input"
                      placeholder="Comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={1}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit();
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
                    onClick={handleCommentSubmit}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center Column - Media Posts (Photos/Videos) */}
        <div className="river-column center-stream">
          {(viewMode === 'timeline' ? mediaPosts : feedMediaPosts).map((post) => (
            <div key={post.id} className="river-card media-card">
              {viewMode === 'feed' && (
                <div className="river-card-author">
                  <div className="author-avatar">{post.avatar}</div>
                  <span className="author-name">{post.author}</span>
                </div>
              )}
              <div className="river-card-media">
                <div className="media-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>
              <div className="river-card-content">
                <p className="river-post-text">{post.content}</p>
                <span className="river-timestamp">{post.timestamp}</span>
              </div>
              <div className="river-card-actions">
                <button className="river-action-btn" aria-label="Comment" onClick={() => handleCommentClick(post.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Repost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(79,255,255,0.5)" strokeWidth="1.5">
                    <polyline points="17 1 21 5 17 9"/>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                    <polyline points="7 23 3 19 7 15"/>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Bookmark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                {/* Edit & Delete - only for own posts in timeline mode */}
                {viewMode === 'timeline' && (
                  <>
                    <button 
                      className="river-action-btn river-action-btn--edit" 
                      aria-label="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPostId(post.id);
                        setActiveCommentPostId(post.id);
                        setCommentText(post.content);
                        setIsEditMode(true);
                        setIsComposerExpanded(true);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      className="river-action-btn river-action-btn--delete" 
                      aria-label="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModalPostId(post.id);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {/* Inline Comment Composer */}
              {activeCommentPostId === post.id && (
                <div className="inline-comment-composer">
                  <div className="comment-input-wrapper">
                    <textarea
                      className="comment-input"
                      placeholder="Comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={1}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleCommentSubmit();
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
                    onClick={handleCommentSubmit}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 6 15 12 9 18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column - Achievements/Milestones */}
        <div className="river-column right-stream">
          {(viewMode === 'timeline' ? achievementPosts : feedAchievementPosts).map((post) => (
            <div key={post.id} className="river-card achievement-card">
              {viewMode === 'feed' && (
                <div className="river-card-author">
                  <div className="author-avatar">{post.avatar}</div>
                  <span className="author-name">{post.author}</span>
                </div>
              )}
              <div className="achievement-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div className="river-card-content">
                <p className="river-post-text">{post.content}</p>
                <span className="river-timestamp">{post.timestamp}</span>
              </div>
              <div className="river-card-actions">
                <button className="river-action-btn" aria-label="Celebrate">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(26,231,132,0.5)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                  </svg>
                </button>
                <button className="river-action-btn" aria-label="Bookmark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,255,0.5)" strokeWidth="1.5">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
                {/* Edit & Delete - only for own posts in timeline mode */}
                {viewMode === 'timeline' && (
                  <>
                    <button 
                      className="river-action-btn river-action-btn--edit" 
                      aria-label="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPostId(post.id);
                        setActiveCommentPostId(post.id);
                        setCommentText(post.content);
                        setIsEditMode(true);
                        setIsComposerExpanded(true);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button 
                      className="river-action-btn river-action-btn--delete" 
                      aria-label="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteModalPostId(post.id);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalPostId && (
        <DeleteConfirmModal
          isOpen={!!deleteModalPostId}
          onClose={() => setDeleteModalPostId(null)}
          onConfirm={async () => {
            setIsDeleting(true);
            try {
              if (onDeletePost) {
                await onDeletePost(deleteModalPostId);
              }
              setDeleteModalPostId(null);
            } catch (error) {
              console.error('Failed to delete post:', error);
            } finally {
              setIsDeleting(false);
            }
          }}
          isDeleting={isDeleting}
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
                className="close-expanded-btn"
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
                className="expanded-composer-textarea"
                placeholder="Edit your post..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                autoFocus
              />
            </div>
            <div className="expanded-composer-footer">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setIsComposerExpanded(false);
                  setIsEditMode(false);
                  setEditingPostId(null);
                  setCommentText('');
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
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
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default TimelineRiver;
