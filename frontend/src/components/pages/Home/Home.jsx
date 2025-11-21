export default function Home() {
  return <div>Home Page</div>;
}
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const mockStories = [
    { id: 1, name: "Your Story", avatar: "YS", hasStory: false, isYours: true },
    { id: 2, name: "Sarah Chen", avatar: "SC", hasStory: true },
    { id: 3, name: "Mike Torres", avatar: "MT", hasStory: true },
    { id: 4, name: "Emma Davis", avatar: "ED", hasStory: true },
    { id: 5, name: "Jason Park", avatar: "JP", hasStory: true },
    { id: 6, name: "Lisa Anderson", avatar: "LA", hasStory: true },
    { id: 7, name: "Chris Lee", avatar: "CL", hasStory: true },
  ];

  const mockPosts = [
    {
      id: 1,
      author: "Sarah Chen",
      content: "Just finished an amazing workout session! Feeling pumped 💪",
      timestamp: "2h",
      likes: 24,
      isPublic: true,
      avatar: "SC"
    },
    {
      id: 2,
      author: "Mike Torres",
      content: "Anyone up for a pickup basketball game this Saturday?",
      timestamp: "4h",
      likes: 12,
      isPublic: true,
      avatar: "MT"
    },
    {
      id: 3,
      author: "Emma Davis",
      content: "New PR on deadlifts today! Hard work pays off 🎉",
      timestamp: "6h",
      likes: 45,
      isPublic: false,
      avatar: "ED"
    },
    {
      id: 4,
      author: "Jason Park",
      content: "Looking for running partners in the downtown area. Hit me up!",
      timestamp: "8h",
      likes: 8,
      isPublic: true,
      avatar: "JP"
    },
    {
      id: 5,
      author: "Lisa Anderson",
      content: "Yoga session at sunset was exactly what I needed today 🧘‍♀️",
      timestamp: "10h",
      likes: 31,
      isPublic: false,
      avatar: "LA"
    }
  ];

  return (
    <div className="feed-container">
      {/* Composer Section */}
      <div className="composer-section" onClick={() => setShowComposerModal(true)}>
        <div className="composer-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="composer-input">
          <span className="composer-placeholder">Share something…</span>
        </div>
      </div>

      {/* Stories Section */}
      <div className="stories-section">
        <div className="stories-scroll">
          {mockStories.map(story => (
            <div key={story.id} className={`story-card ${story.isYours ? 'your-story' : ''}`}>
              <div className={`story-avatar ${story.hasStory ? 'has-story' : ''}`}>
                {story.isYours && !story.hasStory && (
                  <div className="add-story-icon">+</div>
                )}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="story-name">{story.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="feed-list">
        {mockPosts.map(post => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <div className="avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="post-info">
                <div className="feed-author">{post.author}</div>
                <div className="feed-date">{post.timestamp}</div>
              </div>
              <svg className="privacy-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                {post.isPublic ? (
                  // Globe icon for public
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" 
                        fill="currentColor"/>
                ) : (
                  // Lock icon for private
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" 
                        fill="currentColor"/>
                )}
              </svg>
            </div>
            <p className="feed-content">{post.content}</p>
            <div className="feed-likes">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="spectral-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1ae784" />
                    <stop offset="50%" stopColor="#1a73e7" />
                    <stop offset="100%" stopColor="#dc08bc" />
                  </linearGradient>
                </defs>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="url(#spectral-heart)" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {post.likes}
            </div>
            
            {/* Post Actions */}
            <div className="post-actions">
              <button 
                className="action-btn" 
                title="Comment"
                onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Comment</span>
              </button>
              <button className="action-btn" title="Repost">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9"/>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                  <polyline points="7 23 3 19 7 15"/>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
                <span>Repost</span>
              </button>
              <button className="action-btn" title="Analytics">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                <span>Analytics</span>
              </button>
              <button className="action-btn" title="Bookmark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Bookmark</span>
              </button>
              <button className="action-btn" title="Share">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                <span>Share</span>
              </button>
            </div>

            {/* Inline Comment Composer */}
            {activeCommentPostId === post.id && (
              <div className="inline-comment-composer">
                <div className="comment-composer-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="comment-input-wrapper">
                  <textarea
                    className="comment-input"
                    placeholder="Share your thoughts..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={1}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (commentText.trim()) {
                          console.log('Comment posted:', commentText);
                          setCommentText('');
                          setActiveCommentPostId(null);
                        }
                      }
                      if (e.key === 'Escape') {
                        setActiveCommentPostId(null);
                        setCommentText('');
                      }
                    }}
                  />
                  <div className="comment-actions">
                    <button 
                      className="comment-emoji-btn"
                      title="Add emoji"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                        <line x1="9" y1="9" x2="9.01" y2="9"/>
                        <line x1="15" y1="9" x2="15.01" y2="9"/>
                      </svg>
                    </button>
                    <button 
                      className="comment-submit-btn"
                      disabled={!commentText.trim()}
                      onClick={() => {
                        if (commentText.trim()) {
                          console.log('Comment posted:', commentText);
                          setCommentText('');
                          setActiveCommentPostId(null);
                        }
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="comment-hint">
                  Press <kbd>Enter</kbd> to post • <kbd>Shift+Enter</kbd> for new line • <kbd>Esc</kbd> to cancel
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Composer Modal Scaffold */}
      {showComposerModal && (
        <div className="modal-overlay" onClick={() => setShowComposerModal(false)}>
          <div className="composer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Post</h2>
              <button className="modal-close" onClick={() => setShowComposerModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <textarea placeholder="What's on your mind?" rows="6"></textarea>
              <button className="post-button">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;