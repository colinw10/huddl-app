import { useState } from 'react';
import './Home.css';
import TimelineRiverFeed from './components/TimelineRiverFeed';

function Home() {
  const [showComposerModal, setShowComposerModal] = useState(false);
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
      userId: "sarah_chen",
      content: "Just finished an amazing workout session! Feeling pumped 💪",
      timestamp: "2h",
      createdAt: "2024-01-15T14:30:00Z",
      likes: 24,
      isPublic: true,
      avatar: "SC",
      type: "thoughts"
    },
    {
      id: 2,
      author: "Mike Torres",
      userId: "mike_torres",
      content: "Anyone up for a pickup basketball game this Saturday?",
      timestamp: "4h",
      createdAt: "2024-01-15T12:30:00Z",
      likes: 12,
      isPublic: true,
      avatar: "MT",
      type: "thoughts"
    },
    {
      id: 3,
      author: "Emma Davis",
      userId: "emma_davis",
      content: "New PR on deadlifts today! Hard work pays off 🎉",
      timestamp: "6h",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 45,
      isPublic: false,
      avatar: "ED",
      type: "milestones"
    },
    {
      id: 4,
      author: "Jason Park",
      userId: "jason_park",
      content: "Looking for running partners in the downtown area. Hit me up!",
      timestamp: "8h",
      createdAt: "2024-01-15T08:30:00Z",
      likes: 8,
      isPublic: true,
      avatar: "JP",
      type: "thoughts"
    },
    {
      id: 5,
      author: "Lisa Anderson",
      userId: "lisa_anderson",
      content: "Yoga session at sunset was exactly what I needed today 🧘‍♀️",
      timestamp: "10h",
      createdAt: "2024-01-15T06:30:00Z",
      likes: 31,
      isPublic: false,
      avatar: "LA",
      type: "media"
    },
    {
      id: 6,
      author: "Sarah Chen",
      userId: "sarah_chen",
      content: "Check out this amazing sunset from my evening run! 🌅",
      timestamp: "5h",
      createdAt: "2024-01-15T11:30:00Z",
      likes: 56,
      isPublic: true,
      avatar: "SC",
      type: "media"
    },
    {
      id: 7,
      author: "Mike Torres",
      userId: "mike_torres",
      content: "Finally hit my goal of running a sub-20 minute 5K! 🏃‍♂️",
      timestamp: "1d",
      createdAt: "2024-01-14T15:00:00Z",
      likes: 89,
      isPublic: true,
      avatar: "MT",
      type: "milestones"
    },
    {
      id: 8,
      author: "Mike Torres",
      userId: "mike_torres",
      content: "Morning motivation: You don't have to be great to start, but you have to start to be great.",
      timestamp: "1d",
      createdAt: "2024-01-14T09:00:00Z",
      likes: 34,
      isPublic: true,
      avatar: "MT",
      type: "thoughts"
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

      {/* Timeline River Feed */}
      <TimelineRiverFeed
        posts={mockPosts}
        activeCommentPostId={activeCommentPostId}
        setActiveCommentPostId={setActiveCommentPostId}
        commentText={commentText}
        setCommentText={setCommentText}
      />

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