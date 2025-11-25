/**
 * Groups posts by date and user for Timeline River layout
 * @param {Array} posts - Flat array of posts
 * @returns {Object} Nested structure: { dateKey: { userId: { user, thoughts[], media[], milestones[] } } }
 */
export const groupPostsByUserAndDay = (posts) => {
  const grouped = {};  // 🔵 Empty object to store organized data

  posts.forEach((post) => {// 🔵 Loop through each post

    // Extract date key (YYYY-MM-DD format)
    const dateKey = new Date(post.createdAt || Date.now())
      .toISOString() // "2024-01-15T14:30:00.000Z"
      .split("T")[0]; // "2024-01-15"

    // Step 2: Create date bucket if it doesn't exist
    if (!grouped[dateKey]) {
      grouped[dateKey] = {};
    }

    // Step 4: Create user bucket if it doesn't exist
    const userId = post.userId || post.author; // fallback to author for mock data
    if (!grouped[dateKey][userId]) {
      grouped[dateKey][userId] = {
        user: {
          id: userId,
          name: post.author,
          avatar: post.avatar,
        },
        thoughts: [],  // 🔵 Empty arrays for each post type
        media: [],
        milestones: [],
      };
    }

     // Step 5: Add post to correct category (thoughts/media/milestones)
    const type = post.type || "thoughts"; // default to thoughts if no type
    if (grouped[dateKey][userId][type]) {
      grouped[dateKey][userId][type].push(post);// Add post to array
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
  const sorted = []; // 🔵 Empty array to store sorted results

  // Sort dates newest first
  Object.keys(grouped)       // ["2024-01-15", "2024-01-14"]
    .sort((a, b) => new Date(b) - new Date(a)) // Sort dates: newest first
    .forEach((dateKey) => {
      // For each date, add all user rows
      // Step 2: For each date, loop through all users
      Object.keys(grouped[dateKey]).forEach((userId) => {
        sorted.push({
          date: dateKey,
          userId,
          data: grouped[dateKey][userId],  // Contains user + posts arrays
        });
      });
    });

  return sorted;   // 🔵 Return sorted array
};
