// 🔵 PABLO - Utility Functions
// timeFormatters.js - Date/time formatting utilities

/**
 * Format a date string as relative time (e.g., "2h ago", "3d ago")
 * @param {string} dateString - ISO date string or Date object
 * @returns {string} Formatted relative time string
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;

  // For older posts, show the date
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

/**
 * Format a date for display in headers (e.g., "Jan 4")
 * @param {string} dateString - ISO date string or Date object
 * @returns {string} Formatted date string
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
