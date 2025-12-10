/**
 * =============================================================================
 * POSTS CONTEXT
 * =============================================================================
 *
 * File: frontend/src/contexts/PostsContext.jsx
 * Assigned to: COLIN 🟢
 * Responsibility: Global posts state management
 *
 * WHAT THIS FILE DOES:
 * - Stores all posts in React state
 * - Provides functions to fetch/create/update/delete posts
 * - Makes posts available to any component via usePosts() hook
 *
 * HOW CONTEXT WORKS:
 * 1. Create context with createContext()
 * 2. Create Provider component that holds state
 * 3. Create custom hook (usePosts) for easy access
 * 4. Wrap app in Provider (already done in App.jsx)
 *
 * TODO:
 * 1. Import postsService
 * 2. Implement fetchPosts() - call service, update state
 * 3. Implement createPost() - call service, add to state
 * 4. Implement updatePost() - call service, update in state
 * 5. Implement deletePost() - call service, remove from state
 * 6. Implement reply functions
 *
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: import postsService from '../services/postsService';
import { useAuth } from './AuthContext';

const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const { user, isLoading: authLoading } = useAuth();

  // STATE - these are provided for you
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts when user logs in
  useEffect(() => {
    if (authLoading) return;
    if (user) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [user, authLoading]);

  // TODO: Implement fetchPosts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Call postsService.getAll()
      // 2. setPosts() with the result
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Implement createPost
  const createPost = async (data) => {
    try {
      // 1. Call postsService.create(data)
      // 2. Add new post to beginning of posts array
      //    Hint: setPosts(prev => [newPost, ...prev])
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to create' };
    }
  };

  // TODO: Implement updatePost
  const updatePost = async (id, data) => {
    try {
      // 1. Call postsService.update(id, data)
      // 2. Update the post in state array
      //    Hint: setPosts(prev => prev.map(p => p.id === id ? updatedPost : p))
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to update' };
    }
  };

  // TODO: Implement deletePost
  const deletePost = async (id) => {
    try {
      // 1. Call postsService.delete(id)
      // 2. Remove from state array
      //    Hint: setPosts(prev => prev.filter(p => p.id !== id))
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to delete' };
    }
  };

  // TODO: Implement fetchReplies
  const fetchReplies = async (postId) => {
    try {
      // Call postsService.getReplies(postId)
      // Return the replies array
      return [];
    } catch (err) {
      console.error('Failed to fetch replies:', err);
      return [];
    }
  };

  // TODO: Implement createReply
  const createReply = async (parentId, content) => {
    try {
      // Call postsService.createReply(parentId, { content })
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Failed to reply' };
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        isLoading,
        error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        fetchReplies,
        createReply,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default PostsContext;
