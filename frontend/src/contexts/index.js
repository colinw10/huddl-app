/**
 * =============================================================================
 * CONTEXTS INDEX
 * =============================================================================
 *
 * Barrel export for all contexts.
 * Import like: import { useAuth, usePosts, useFriends } from '../contexts';
 *
 * =============================================================================
 */

export { AuthProvider, useAuth } from "./AuthContext";
export { PostsProvider, usePosts } from "./PostsContext";
export { FriendsProvider, useFriends } from "./FriendsContext";
export { ThemeProvider, useTheme } from "./ThemeContext";
export { MessageProvider, useMessages } from "./MessageContext";
