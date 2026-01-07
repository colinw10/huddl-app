// 🔵 PABLO - UI/Styling
// RiverTimelineView.jsx - Timeline mode view for own profile posts

import React from 'react';
import {
  MessageBubbleIcon,
  ImageIcon,
  ExpandIcon,
  MilestoneIcon,
} from '@assets/icons';
import RiverSmartDeck from '../RiverSmartDeck';
import './RiverTimelineView.scss';

const CAROUSEL_LIMIT = 12;

function RiverTimelineView({
  textPosts,
  mediaPosts,
  achievementPosts,
  profileUser,
  mobileCategory,
  setMobileCategory,
  getDeckIndex,
  handleDeckIndexChange,
  setExpandedMediaPost,
  renderPostActions,
  renderCommentSection,
  formatDate,
}) {
  // Split posts into carousel (first 12) and river continuation (rest)
  const carouselText = textPosts.slice(0, CAROUSEL_LIMIT);
  const carouselMedia = mediaPosts.slice(0, CAROUSEL_LIMIT);
  const carouselAchievements = achievementPosts.slice(0, CAROUSEL_LIMIT);
  
  const riverText = textPosts.slice(CAROUSEL_LIMIT);
  const riverMedia = mediaPosts.slice(CAROUSEL_LIMIT);
  const riverAchievements = achievementPosts.slice(CAROUSEL_LIMIT);
  
  const hasRiverContinuation = riverText.length > 0 || riverMedia.length > 0 || riverAchievements.length > 0;

  return (
    <>
      {/* Mobile Category Tabs */}
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

      {/* River Column Labels - desktop only */}
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

      {/* Three Column River - Carousel Section */}
      <div className={`river-streams mobile-show-${mobileCategory}`}>
        {/* Left Stream - Thoughts */}
        <div className="river-column left-stream" data-category="thoughts">
          {carouselText.length > 0 ? (
            <>
              <div className="river-card text-card">
                <div className="river-card-content">
                  <p className="river-post-text">{carouselText[getDeckIndex(profileUser?.username || 'me', 'thoughts')]?.content}</p>
                  <span className="river-timestamp">{formatDate(carouselText[getDeckIndex(profileUser?.username || 'me', 'thoughts')]?.created_at)}</span>
                </div>
                {renderPostActions(carouselText[getDeckIndex(profileUser?.username || 'me', 'thoughts')])}
                {renderCommentSection(carouselText[getDeckIndex(profileUser?.username || 'me', 'thoughts')])}
              </div>
              <RiverSmartDeck
                items={carouselText}
                deckKey={`${profileUser?.username || 'me'}-thoughts`}
                currentIndex={getDeckIndex(profileUser?.username || 'me', 'thoughts')}
                onIndexChange={handleDeckIndexChange}
              />
            </>
          ) : (
            <div className="empty-column">No thoughts yet</div>
          )}
        </div>
        
        {/* Center Stream - Media */}
        <div className="river-column center-stream" data-category="media">
          {carouselMedia.length > 0 ? (
            <>
              <div className="river-card media-card">
                <div 
                  className="river-card-media" 
                  onClick={() => setExpandedMediaPost(carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')])}
                  title="Click to expand"
                >
                  {carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')]?.media_url ? (
                    <>
                      <img src={carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')].media_url} alt="" className="media-image" />
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
                  <p className="river-post-text">{carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')]?.content}</p>
                  <span className="river-timestamp">{formatDate(carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')]?.created_at)}</span>
                </div>
                {renderPostActions(carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')])}
                {renderCommentSection(carouselMedia[getDeckIndex(profileUser?.username || 'me', 'media')])}
              </div>
              <RiverSmartDeck
                items={carouselMedia}
                deckKey={`${profileUser?.username || 'me'}-media`}
                currentIndex={getDeckIndex(profileUser?.username || 'me', 'media')}
                onIndexChange={handleDeckIndexChange}
              />
            </>
          ) : (
            <div className="empty-column">No media yet</div>
          )}
        </div>
        
        {/* Right Stream - Milestones */}
        <div className="river-column right-stream" data-category="milestones">
          {carouselAchievements.length > 0 ? (
            <>
              <div className="river-card achievement-card">
                <div className="achievement-badge">
                  <MilestoneIcon size={24} />
                </div>
                <div className="river-card-content">
                  <p className="river-post-text">{carouselAchievements[getDeckIndex(profileUser?.username || 'me', 'milestones')]?.content}</p>
                  <span className="river-timestamp">{formatDate(carouselAchievements[getDeckIndex(profileUser?.username || 'me', 'milestones')]?.created_at)}</span>
                </div>
                {renderPostActions(carouselAchievements[getDeckIndex(profileUser?.username || 'me', 'milestones')])}
                {renderCommentSection(carouselAchievements[getDeckIndex(profileUser?.username || 'me', 'milestones')])}
              </div>
              <RiverSmartDeck
                items={carouselAchievements}
                deckKey={`${profileUser?.username || 'me'}-milestones`}
                currentIndex={getDeckIndex(profileUser?.username || 'me', 'milestones')}
                onIndexChange={handleDeckIndexChange}
              />
            </>
          ) : (
            <div className="empty-column">No milestones yet</div>
          )}
        </div>
      </div>

      {/* River Continuation - Posts beyond first 12 */}
      {hasRiverContinuation && (
        <div className="river-continuation">
          <h3 className="continuation-header">More Posts</h3>
          <div className={`river-streams mobile-show-${mobileCategory}`}>
            {/* Left Stream - More Thoughts */}
            <div className="river-column left-stream" data-category="thoughts">
              {riverText.map((post) => (
                <div key={post.id} className="river-card text-card">
                  <div className="river-card-content">
                    <p className="river-post-text">{post.content}</p>
                    <span className="river-timestamp">{formatDate(post.created_at)}</span>
                  </div>
                  {renderPostActions(post)}
                  {renderCommentSection(post)}
                </div>
              ))}
            </div>
            
            {/* Center Stream - More Media */}
            <div className="river-column center-stream" data-category="media">
              {riverMedia.map((post) => (
                <div key={post.id} className="river-card media-card">
                  <div 
                    className="river-card-media"
                    onClick={() => setExpandedMediaPost(post)}
                    title="Click to expand"
                  >
                    {post.media_url ? (
                      <>
                        <img src={post.media_url} alt="" className="media-image" />
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
                    <p className="river-post-text">{post.content}</p>
                    <span className="river-timestamp">{formatDate(post.created_at)}</span>
                  </div>
                  {renderPostActions(post)}
                  {renderCommentSection(post)}
                </div>
              ))}
            </div>
            
            {/* Right Stream - More Milestones */}
            <div className="river-column right-stream" data-category="milestones">
              {riverAchievements.map((post) => (
                <div key={post.id} className="river-card achievement-card">
                  <div className="achievement-badge">
                    <MilestoneIcon size={24} />
                  </div>
                  <div className="river-card-content">
                    <p className="river-post-text">{post.content}</p>
                    <span className="river-timestamp">{formatDate(post.created_at)}</span>
                  </div>
                  {renderPostActions(post)}
                  {renderCommentSection(post)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RiverTimelineView;
