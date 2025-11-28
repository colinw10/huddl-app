// 🔵 PABLO - UI/Styling | 🟢 COLIN + 🟠 TITO - API Logic
// Home.jsx - Timeline river feed page

import { useState } from 'react';
import './Home.css';
import TimelineRiverFeed from './components/TimelineRiverFeed';

function Home() {
    
   // 🔵 STATE 1: Controls if the big composer modal is open/closed
   //(Is the post creation modal visible?)
  const [showComposerModal, setShowComposerModal] = useState(false);
  //↑ variable (boolean)   ↑ function to change it   ↑ starts closed (false)

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

  const mockStories = [
    { id: 1, name: "Your Story", avatar: "YS", hasStory: false, isYours: true },
    { id: 2, name: "Pablo Cordero", avatar: "PC", hasStory: true },
    { id: 3, name: "Arthur Bernier", avatar: "AB", hasStory: true },
    { id: 4, name: "Joshua Miller", avatar: "JM", hasStory: true },
    { id: 5, name: "Natalia P", avatar: "NP", hasStory: true },
    { id: 6, name: "Colin Weir", avatar: "CW", hasStory: true },
    { id: 7, name: "Tito", avatar: "T", hasStory: true },
    { id: 8, name: "Crystal Ruiz", avatar: "CR", hasStory: true },
  ];

  const mockPosts = [
    {
      id: 1,
      author: "Pablo Cordero",
      userId: "pablo_cordero",
      content: "Just finished an amazing workout session! Feeling pumped 🦾",
      timestamp: "2h",
      createdAt: "2024-01-15T14:30:00Z",
      likes: 24,
      isPublic: true,
      avatar: "PC",
      type: "thoughts"
      // ⚠️ Important: posts have types (thoughts, media, milestones)
    },
    {
      id: 2,
      author: "Pablo Cordero",
      userId: "pablo_cordero",
      content: "Check out this amazing northern lights view! 🌌",
      timestamp: "2h",
      createdAt: "2024-01-15T14:25:00Z",
      likes: 56,
      isPublic: true,
      avatar: "PC",
      type: "media", // ⚠️ Has media_url
      media_url: "https://ustoa.com/blog/wp-content/uploads/2019/07/northern-lights2-1024x678.jpg"
    },
    {
      id: 3,
      author: "Pablo Cordero",
      userId: "pablo_cordero",
      content: "🏆 Shipped Huddl v1.0! From concept to production in 2 weeks. Dreams become reality when you stop waiting.",
      timestamp: "2h",
      createdAt: "2024-01-15T14:20:00Z",
      likes: 142,
      isPublic: true,
      avatar: "PC",
      type: "milestones"
    },
    {
      id: 4,
      author: "Arthur Bernier",
      userId: "arthur_bernier",
      content: "Finally completed my first marathon! 26.2 miles of pure determination 🏃‍♀️🎉",
      timestamp: "3h",
      createdAt: "2024-01-15T13:30:00Z",
      likes: 98,
      isPublic: true,
      avatar: "AB",
      type: "milestones"
    },
    {
      id: 5,
      author: "Joshua Miller",
      userId: "joshua_miller",
      content: "Anyone up for a pickup basketball game this Saturday?",
      timestamp: "4h",
      createdAt: "2024-01-15T12:30:00Z",
      likes: 12,
      isPublic: true,
      avatar: "JM",
      type: "thoughts"
    },
    {
      id: 6,
      author: "Natalia P",
      userId: "natalia_p",
      content: "New PR on deadlifts today! Hard work pays off 🎉",
      timestamp: "6h",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 45,
      isPublic: false,
      avatar: "NP",
      type: "milestones"
    },
    {
      id: 7,
      author: "Colin Weir",
      userId: "colin_weir",
      content: "Looking for running partners in the downtown area. Hit me up!",
      timestamp: "8h",
      createdAt: "2024-01-15T08:30:00Z",
      likes: 8,
      isPublic: true,
      avatar: "CW",
      type: "thoughts"
    },
    {
      id: 8,
      author: "Tito",
      userId: "tito",
      content: "Yoga session at sunset was exactly what I needed today 🧘‍♀️",
      timestamp: "10h",
      createdAt: "2024-01-15T06:30:00Z",
      likes: 31,
      isPublic: false,
      avatar: "T",
      type: "media",
      media_url: "https://publish.purewow.net/wp-content/uploads/sites/2/2021/03/advanced-yoga-poses-visvamitrasana.jpg?fit=680%2C400"
    },
    {
      id: 9,
      author: "Crystal Ruiz",
      userId: "crystal_ruiz",
      content: "Finally hit my goal of running a sub-20 minute 5K! 🏃‍♂️",
      timestamp: "1d",
      createdAt: "2024-01-14T15:00:00Z",
      likes: 89,
      isPublic: true,
      avatar: "CR",
      type: "milestones"
    },
    {
      id: 10,
      author: "Joshua Miller",
      userId: "joshua_miller",
      content: "Morning motivation: You don't have to be great to start, but you have to start to be great.",
      timestamp: "1d",
      createdAt: "2024-01-14T09:00:00Z",
      likes: 34,
      isPublic: true,
      avatar: "JM",
      type: "thoughts"
    }
  ];

  return (
    <div className="feed-container">
       {/* 🟢 Section 1: Composer (click to open modal) */}
      <div className="composer-section" onClick={() => setShowComposerModal(true)}>
        {/* //      ↑ EVENT    ↑ INLINE HANDLER that changes state
        // When user clicks this div → showComposerModal becomes true */}
        <div className="composer-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
         {/* Fake input that looks real */}
        <div className="composer-input">
          <span className="composer-placeholder">Share something…</span>
        </div>
      </div>

       {/* 🟢 Section 2: Stories carousel */}
      <div className="stories-section">
        <div className="stories-scroll">
          {mockStories.map(story => ( // 🔵 Loop through stories array
            <div 
              key={story.id} 
              className={`story-card ${story.isYours ? 'your-story' : ''}`}
              onMouseMove={handleStoryMouseMove}
              onMouseLeave={handleStoryMouseLeave}
            >
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

       {/* 🟢 Section 3: Timeline River Feed (the main posts) */}
      <TimelineRiverFeed
      // PROP 1: Pass the entire posts array (data)
        posts={mockPosts}// ⚠️ CRITICAL: Passes posts data to child component
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