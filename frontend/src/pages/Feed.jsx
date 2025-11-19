import '../styles/Feed.css';

function Feed() {
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
      <h1 className="feed-title">Your Feed</h1>
      <div className="feed-list">
        {mockPosts.map(post => (
          <div key={post.id} className="feed-post">
            <div className="post-header">
              <div className="avatar">{post.avatar}</div>
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
            <div className="feed-likes">❤️ {post.likes} likes</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;