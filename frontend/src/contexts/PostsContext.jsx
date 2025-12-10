/**
 * =============================================================================
 * POSTS CONTEXT
 * =============================================================================
 * 
 * File: frontend/src/contexts/PostsContext.jsx
 * Assigned to: COLIN
 * Responsibility: Global posts state management
 * 
 * Status: IMPLEMENTED ✅
 * =============================================================================
 */
import React, { createContext, useContext, useState, useEffect} from 'react';
import postsService from '../services/postsService';
import { useAuth } from './AuthContext';

// Create the context object - this is what components will consume
const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth(); // Get auth state
  
  // STATE - the "source of truth" for all posts data
  const [posts, setPosts] = useState([]); // Array of post objects
  const [isLoading, setIsLoading] = useState(false);// True while fetching
  const [error, setError] = useState(null); // Error message if something fails

  // FETCH WHEN USER LOGS IN (and auth is done loading)
  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish
    if (user && isAuthenticated) {
      fetchPosts();
    } else {
      setPosts([]); // Clear posts when logged out
    }
  }, [user, authLoading, isAuthenticated]);

   // FETCH ALL POSTS
   const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);  // Clear any previous errors
    try {
      const data = await postsService.getAll();// Call service, get array
      setPosts(data); // Store in state
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch posts');

    }  finally {
      setIsLoading(false)// Always turn off loading, success or fail
    }
  };

   // CREATE POST
   const createPost = async (content) => {
    try {
      const newPost = await postsService.create(content);// Returns new post with id
      setPosts(prev => [newPost, ...prev]);// Add to top of list (spread previous posts after)
      return {success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.detail || 'Failed to create post'
      };
    }
   };
 // UPDATE POST
 const updatePost = async (id, data) => {
  try {
    const updatedPost = await postsService.update(id, data); // Returns updated post
      // Replace old post with updated one in state
      setPosts(prev => prev.map(post =>
        post.id === id? updatedPost : post // If id matches, use updated; otherwise keep original
      ));
      return {success: true};
      } catch (err) {
        return {
          success: false, 
          error: err.response?.data?.detail || 'Failed to update post'
        };
      }
 };
// DELETE POST
const deletePost = async (id) => {
  try {
    await postsService.delete(id);// No return value
    setPosts(prev => prev.filter(post => post.id !== id));// Remove from state by filtering out
    return { success: true};
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.detail || 'Failed to delete post'
    };
  }
};
// PROVIDER - wraps app and exposes state + actions to all children
return (
  <PostsContext.Provider
  value ={{
    //State
    posts,
    isLoading,
    error,
     // Actions
     fetchPosts,
     createPost,
     updatePost,
     deletePost,
  }}
  >
  {children}
  </PostsContext.Provider>
);

};

// CUSTOM HOOK - cleaner way to consume context
export const usePosts = () => {
  const context = useContext(PostsContext); // Grab context value
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider'); // Safety check
  }
  return context;
};

export default PostsContext;