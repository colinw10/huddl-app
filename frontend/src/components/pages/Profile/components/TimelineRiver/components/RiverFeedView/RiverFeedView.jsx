// 🔵 PABLO - UI/Styling
// RiverFeedView.jsx - Feed mode view for friends' posts

import React from 'react';
import {
  MessageBubbleIcon,
  ImageIcon,
  MilestoneIcon,
} from '@assets/icons';
import RiverSmartDeck from '../RiverSmartDeck';

function RiverFeedView({
  friendsGrouped,
  mobileCategory,
  setMobileCategory,
  getDeckIndex,
  handleDeckIndexChange,
  navigate,
  renderPostActions,
  renderCommentSection,
  formatDate,
}) {
  return (
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
            {/* Left Stream - Thoughts */}
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
                    {renderPostActions(friend.thoughts[getDeckIndex(friend.username, 'thoughts')], true)}
                    {/* Comment section */}
                    {renderCommentSection(friend.thoughts[getDeckIndex(friend.username, 'thoughts')])}
                  </div>
                  <RiverSmartDeck
                    items={friend.thoughts}
                    deckKey={`${friend.username}-thoughts`}
                    currentIndex={getDeckIndex(friend.username, 'thoughts')}
                    onIndexChange={handleDeckIndexChange}
                  />
                </>
              ) : <div className="empty-column">No thoughts</div>}
            </div>

            {/* Center Stream - Media */}
            <div className="river-column center-stream" data-category="media">
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
                    {renderPostActions(friend.media[getDeckIndex(friend.username, 'media')], true)}
                    {/* Comment section */}
                    {renderCommentSection(friend.media[getDeckIndex(friend.username, 'media')])}
                  </div>
                  <RiverSmartDeck
                    items={friend.media}
                    deckKey={`${friend.username}-media`}
                    currentIndex={getDeckIndex(friend.username, 'media')}
                    onIndexChange={handleDeckIndexChange}
                  />
                </>
              ) : <div className="empty-column">No media</div>}
            </div>

            {/* Right Stream - Milestones */}
            <div className="river-column right-stream" data-category="milestones">
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
                    {renderPostActions(friend.milestones[getDeckIndex(friend.username, 'milestones')], true)}
                    {/* Comment section */}
                    {renderCommentSection(friend.milestones[getDeckIndex(friend.username, 'milestones')])}
                  </div>
                  <RiverSmartDeck
                    items={friend.milestones}
                    deckKey={`${friend.username}-milestones`}
                    currentIndex={getDeckIndex(friend.username, 'milestones')}
                    onIndexChange={handleDeckIndexChange}
                  />
                </>
              ) : <div className="empty-column">No milestones</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RiverFeedView;
