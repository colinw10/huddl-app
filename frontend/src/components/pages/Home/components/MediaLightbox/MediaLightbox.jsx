// 🔵 PABLO - UI Architect
// MediaLightbox.jsx - Fullscreen media viewer modal

import { createPortal } from 'react-dom';
import './MediaLightbox.scss';

function MediaLightbox({ post, onClose, commentText, setCommentText }) {
  if (!post) return null;

  // Use React Portal to render at document body level
  // This ensures the lightbox escapes all parent overflow/transform constraints
  return createPortal(
    <div className="media-lightbox-overlay" onClick={onClose}>
      <div className="media-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="media-lightbox-close" onClick={onClose}>
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
              <div className="media-lightbox-author">{post.author}</div>
              <div className="media-lightbox-timestamp">{post.timestamp}</div>
            </div>
          </div>
          
          <p className="media-lightbox-caption">{post.content}</p>
          
          <div className="media-lightbox-actions">
            <button className="media-action-btn">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="lightbox-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1ae784" />
                    <stop offset="50%" stopColor="#1a73e7" />
                    <stop offset="100%" stopColor="#dc08bc" />
                  </linearGradient>
                </defs>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                      fill="url(#lightbox-heart)" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>{post.likes}</span>
            </button>
            <button className="media-action-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              <span>Share</span>
            </button>
          </div>

          {/* Comment Section in Lightbox */}
          <div className="media-lightbox-comments">
            <div className="lightbox-comments-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span>Comments</span>
            </div>
            
            {/* Comment Composer */}
            <div className="lightbox-comment-composer">
              <div className="comment-composer-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="lightbox-comment-input-wrapper">
                <textarea
                  className="lightbox-comment-input"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (commentText.trim()) {
                        console.log('Comment posted:', commentText);
                        setCommentText('');
                        e.target.style.height = 'auto';
                      }
                    }
                  }}
                />
                <div className="lightbox-comment-actions">
                  <button className="comment-emoji-btn" title="Add emoji">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </button>
                  <button 
                    className="lightbox-comment-submit-btn"
                    disabled={!commentText.trim()}
                    onClick={() => {
                      if (commentText.trim()) {
                        console.log('Comment posted:', commentText);
                        setCommentText('');
                        const textarea = document.querySelector('.lightbox-comment-input');
                        if (textarea) textarea.style.height = 'auto';
                      }
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Example Comments (placeholder) */}
            <div className="lightbox-comments-list">
              <div className="lightbox-comment-item">
                <div className="comment-composer-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="lightbox-comment-content">
                  <div className="lightbox-comment-author">John Doe</div>
                  <div className="lightbox-comment-text">Amazing shot! 😍</div>
                  <div className="lightbox-comment-meta">2h ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MediaLightbox;
