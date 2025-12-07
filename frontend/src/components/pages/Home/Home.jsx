// 🔵 PABLO - UI/Styling | 🟢 COLIN + 🟠 TITO - API Logic
// Home.jsx - Timeline river feed page

import { useState } from 'react';
import './Home.scss';
import TimelineRiverFeed from './components/TimelineRiverFeed';
import { usePosts, useFriends } from '../../../contexts';

function Home() {
  // Get real data from contexts
  const { posts, isLoading: postsLoading } = usePosts();
  const { friends } = useFriends();
    
   // 🔵 STATE 1: Controls if the big composer modal is open/closed
   //(Is the post creation modal visible?)
  const [showComposerModal, setShowComposerModal] = useState(false);
  //↑ variable (boolean)   ↑ function to change it   ↑ starts closed (false)

  // STATE: Inline composer text
  const [composerText, setComposerText] = useState('');

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

  // Build stories from friends (real data)
  const stories = [
    { id: 0, name: "Your Story", avatar: "YS", hasStory: false, isYours: true },
    ...friends.map(friend => ({
      id: friend.id,
      name: friend.first_name || friend.username,
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
            rows={1}
          />
        </div>
        <button 
          className="composer-expand-btn"
          onClick={() => setShowComposerModal(true)}
          title="Expand"
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
      />

    {/* 🟢 Section 4: Composer Modal (when user clicks composer) */}
    {/* (Left side of &&) Is showComposerModal truthy? */}
    {/* Right side: If yes, render this(true) */}
      {showComposerModal && ( // 🔵 Only shows if showComposerModal is true
        <div className="modal-overlay" onClick={() => setShowComposerModal(false)}>
          {/* //      ↑ Click overlay (dark background) → close modal */}
          <div className="composer-modal" onClick={(e) => e.stopPropagation()}>
            {/* ↑ IMPORTANT: Stop click from bubbling to overlay */}
            {/* Without this, clicking modal content would close it! */}
             
             {/* Modal header with close button */}
            <div className="modal-header">
              <h2>Create Post</h2>

               {/* X button to close */}
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