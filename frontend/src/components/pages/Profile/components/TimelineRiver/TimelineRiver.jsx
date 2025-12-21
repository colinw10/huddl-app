// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Posts Data
// TimelineRiver.jsx - Profile timeline showing user's posts in river format

import React, { useState, useMemo } from 'react';
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
          avatar: post.author?.first_name?.[0] || username[0]?.toUpperCase() || '?',
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
  console.log('TimelineRiver friendsGrouped:', friendsGrouped, 'feedTextPosts:', feedTextPosts?.length, 'feedMediaPosts:', feedMediaPosts?.length, 'feedAchievementPosts:', feedAchievementPosts?.length);

  // State for inline comment composer
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  // State for edit/delete
  const [deleteModalPostId, setDeleteModalPostId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isComposerExpanded, setIsComposerExpanded] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleCommentClick = (postId) => {
    if (activeCommentPostId === postId) {
      setActiveCommentPostId(null);
      setCommentText('');
    } else {
      setActiveCommentPostId(postId);
      setCommentText('');
    }
  };

  // TODO: Wire up comment submission
  // const handleCommentSubmit = () => {
  //   if (commentText.trim()) {
  //     console.log('Comment posted:', commentText);
  //     setCommentText('');
  //     setActiveCommentPostId(null);
  //   }
  // };

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

      {/* MY TIMELINE MODE - User's own posts */}
      {viewMode === 'timeline' && (
        <div className="river-streams">
          <div className="river-column left-stream">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Thoughts</span>
            </div>
            {textPosts.map((post) => (
              <div key={post.id} className="river-card text-card">
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
                  <button className="river-action-btn river-action-btn--edit" aria-label="Edit" onClick={() => { setEditingPostId(post.id); setCommentText(post.content); setIsEditMode(true); setIsComposerExpanded(true); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="river-action-btn river-action-btn--delete" aria-label="Delete" onClick={() => setDeleteModalPostId(post.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="river-column center-stream">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>Media</span>
            </div>
            {mediaPosts.map((post) => (
              <div key={post.id} className="river-card media-card">
                <div className="river-card-media">
                  {post.media_url ? (
                    <img src={post.media_url} alt="" className="media-image" />
                  ) : (
                    <div className="media-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="river-card-content">
                  <p className="river-post-text">{post.content}</p>
                  <span className="river-timestamp">{post.timestamp}</span>
                </div>
                <div className="river-card-actions">
                  <button className="river-action-btn river-action-btn--edit" aria-label="Edit" onClick={() => { setEditingPostId(post.id); setCommentText(post.content); setIsEditMode(true); setIsComposerExpanded(true); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="river-action-btn river-action-btn--delete" aria-label="Delete" onClick={() => setDeleteModalPostId(post.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="river-column right-stream">
            <div className="river-column-label mobile-only">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>Milestones</span>
            </div>
            {achievementPosts.map((post) => (
              <div key={post.id} className="river-card achievement-card">
                <div className="achievement-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div className="river-card-content">
                  <p className="river-post-text">{post.content}</p>
                  <span className="river-timestamp">{post.timestamp}</span>
                </div>
                <div className="river-card-actions">
                  <button className="river-action-btn river-action-btn--edit" aria-label="Edit" onClick={() => { setEditingPostId(post.id); setCommentText(post.content); setIsEditMode(true); setIsComposerExpanded(true); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,193,7,0.6)" strokeWidth="1.5">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button className="river-action-btn river-action-btn--delete" aria-label="Delete" onClick={() => setDeleteModalPostId(post.id)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,82,82,0.6)" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FRIENDS FEED MODE - Each friend in their own row */}
      {viewMode === 'feed' && (
        <div className="friends-feed-rows">
          {friendsGrouped.map((friend) => (
            <div key={friend.username} className="friend-row">
              <div className="friend-row-header">
                <div className="friend-avatar">{friend.avatar}</div>
                <span className="friend-name">{friend.username}</span>
              </div>
              <div className="river-streams">
                <div className="river-column left-stream">
                  {friend.thoughts.length > 0 ? (
                    <>
                      <div className="river-card text-card">
                        <div className="river-card-content">
                          <p className="river-post-text">{friend.thoughts[getDeckIndex(friend.username, 'thoughts')]?.content}</p>
                          <span className="river-timestamp">{friend.thoughts[getDeckIndex(friend.username, 'thoughts')]?.timestamp}</span>
                        </div>
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
                          <span className="river-timestamp">{friend.media[getDeckIndex(friend.username, 'media')]?.timestamp}</span>
                        </div>
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
                          <span className="river-timestamp">{friend.milestones[getDeckIndex(friend.username, 'milestones')]?.timestamp}</span>
                        </div>
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
    </div>
  );
}

export default TimelineRiver;
