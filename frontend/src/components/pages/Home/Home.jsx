// 🔵 PABLO - UI/Styling | 🟢 COLIN + 🟠 TITO - API Logic
// Home.jsx - Timeline river feed page

import { useState } from 'react';
import './Home.scss';
import TimelineRiverFeed from './components/TimelineRiverFeed';
import ComposerModal from '../Profile/components/ComposerModal/ComposerModal';
import { usePosts, useFriends } from '../../../contexts';

function Home() {
  // Get real data from contexts
  const { posts, createPost, deletePost, updatePost } = usePosts();
  const { friends } = useFriends();
    
   // 🔵 STATE 1: Controls if the big composer modal is open/closed
  const [showComposer, setShowComposer] = useState(false);
  const [composerType, setComposerType] = useState('thought'); // 'thought', 'media', or 'milestone'

  // STATE: Inline composer text
  const [composerText, setComposerText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

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

    // STATE 2: Tracks WHICH post has its comment box open (null = none open)
    // (Which post's comment box is open?)
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  //↑ variable (number or null)   ↑ setter function   ↑ starts with none open
  // Which post user is commenting on

  // STATE 3: Stores what user is typing in comment box
   // (What's in the comment textarea?)
  const [commentText, setCommentText] = useState('');
    // ↑ variable (string)   ↑ setter function   ↑ starts empty

  // HANDLER 1: Creates 3D tilt effect when mouse moves over story card
  const handleStoryMouseMove = (e) => {
    const card = e.currentTarget;
    // Get the story card element that mouse is over
    const rect = card.getBoundingClientRect();
    // Get card's position/size on screen

    // Calculate mouse position RELATIVE to card (not whole screen)
    const x = e.clientX - rect.left;// Mouse Y position relative to card
    // Mouse X position from LEFT edge of browser window

    const y = e.clientY - rect.top; // Mouse Y position relative to card
    // Mouse Y position from TOP edge of browser window
  
    // Find center of card- calculate how far mouse is from center
    const centerX = rect.width / 2; // Find center of card
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -1; // Max 1 degree
                                                    // Vertical tilt
     // Calculate rotation based on distance from center                                          
    // If mouse is at center → no rotation (0deg)
    // If mouse is at edge → max rotation (±1deg)
     const rotateY = ((x - centerX) / centerX) * 1; // Max 1 degree
                                                   // Horizontal tilt
    // Apply 3D transform to card (lift + tilt)
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
   // HANDLER 2: Reset card when mouse leaves
  const handleStoryMouseLeave = (e) => {
    // Remove transform → card returns to normal
    e.currentTarget.style.transform = ''; // Reset animation
  
  };

  // Helper to get initials
  const getInitials = (firstName, lastName, username) => {
    if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
    if (firstName) return firstName.slice(0, 2).toUpperCase();
    return username.slice(0, 2).toUpperCase();
  };

  // Build stories from friends (real data) - always use username
  const stories = [
    { id: 0, name: "Your Story", avatar: "YS", hasStory: false, isYours: true },
    ...friends.map(friend => ({
      id: friend.id,
      name: friend.username,
      avatar: getInitials(friend.first_name, friend.last_name, friend.username),
      hasStory: true,
    }))
  ];

  return (
    <div className="feed-container">
       {/* 🟢 Section 1: Composer (click to open modal) */}
      <div className="composer-section">
        <div className="composer-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="composer-input-wrapper">
          <textarea
            className="composer-input"
            placeholder="Share something…"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            onKeyDown={handleInlineKeyDown}
            rows={1}
            disabled={isPosting}
          />
        </div>
        {/* Post icon - shows when there's text */}
        {composerText.trim() && !isPosting && (
          <span 
            className="composer-post-icon"
            onClick={handleInlinePost}
            title="Post"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,3 21,19 3,19"/>
            </svg>
          </span>
        )}
        <button 
          className="composer-expand-btn"
          onClick={() => setShowComposer(true)}
          title="More options"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>
      </div>

       {/* 🟢 Section 2: Stories carousel */}
      <div className="stories-section">
        <div className="stories-scroll">
          {stories.map(story => ( // 🔵 Loop through stories array
            <div 
              key={story.id} 
              className={`story-card ${story.isYours ? 'your-story' : ''}`}
              onMouseMove={handleStoryMouseMove}
              onMouseLeave={handleStoryMouseLeave}
            >
              <div className={`story-avatar ${story.hasStory ? 'has-story' : ''}`}>
                {story.isYours ? (
                  // Your Story - show + icon
                  <div className="add-story-icon">+</div>
                ) : (
                  // Other stories - show person icon
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                )}
              </div>
              <div className="story-name">{story.name}</div>
            </div>
          ))}
        </div>
      </div>

       {/* 🟢 Section 3: Timeline River Feed (the main posts) */}
      <TimelineRiverFeed
      // PROP 1: Pass the entire posts array (data)
        posts={posts}// ⚠️ CRITICAL: Passes posts data to child component
      //↑ name of prop   ↑ value (the array)

      // PROP 2: Pass state variable (so child knows which comment is open)
        activeCommentPostId={activeCommentPostId}

        // PROP 3: Pass state SETTER (so child can CHANGE parent's state!)
        setActiveCommentPostId={setActiveCommentPostId}

        // PROP 4: Pass state variable (comment text)
        commentText={commentText}
        //          ↑ current value
        setCommentText={setCommentText}
         // PROP 5: Pass state SETTER (so child can update text)
        
        // PROP 6 & 7: Delete and update actions
        onDeletePost={deletePost}
        onUpdatePost={updatePost}
      />

    {/* 🟢 Section 4: Composer Modal (shared with Profile) */}
      <ComposerModal 
        showComposer={showComposer}
        setShowComposer={setShowComposer}
        composerType={composerType}
        setComposerType={setComposerType}
      />
    </div>
  );
}

export default Home;