/**
 * Groups posts by date and user for Timeline River layout
 * @param {Array} posts - Flat array of posts
 * @returns {Object} Nested structure: { dateKey: { userId: { user, thoughts[], media[], milestones[] } } }
 */
export const groupPostsByUserAndDay = (posts) => {
  const grouped = {};

  posts.forEach((post) => {
    // Extract date key (YYYY-MM-DD format)
    const dateKey = new Date(post.createdAt || Date.now())
      .toISOString()
      .split("T")[0];

    // Initialize date bucket if not exists
    if (!grouped[dateKey]) {
      grouped[dateKey] = {};
    }

    // Initialize user bucket if not exists
    const userId = post.userId || post.author; // fallback to author for mock data
    if (!grouped[dateKey][userId]) {
      grouped[dateKey][userId] = {
        user: {
          id: userId,
          name: post.author,
          avatar: post.avatar,
        },
        thoughts: [],
        media: [],
        milestones: [],
      };
    }

    // Add post to appropriate category
    const type = post.type || "thoughts"; // default to thoughts if no type
    if (grouped[dateKey][userId][type]) {
      grouped[dateKey][userId][type].push(post);
    }
  });

  return grouped;
};

/**
 * Converts grouped posts into sorted array for rendering
 * @param {Object} grouped - Result from groupPostsByUserAndDay
 * @returns {Array} Sorted array of { date, userId, data }
 */
export const sortGroupedPosts = (grouped) => {
  const sorted = [];

  // Sort dates newest first
  Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a))
    .forEach((dateKey) => {
      // For each date, add all user rows
      Object.keys(grouped[dateKey]).forEach((userId) => {
        sorted.push({
          date: dateKey,
          userId,
          data: grouped[dateKey][userId],
        });
      });
    });

  return sorted;
};
