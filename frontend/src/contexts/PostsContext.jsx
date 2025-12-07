/**
 * =============================================================================
 * POSTS CONTEXT
 * =============================================================================
 * 
 * File: frontend/src/contexts/PostsContext.jsx
 * Assigned to: COLIN
 * Responsibility: Global posts state management
 * 
 * TODO:
 * - [ ] Import postsService
 * - [ ] Implement fetchPosts() - load posts on mount
 * - [ ] Implement createPost(content) - add new post
 * - [ ] Implement updatePost(id, data) - edit existing post
 * - [ ] Implement deletePost(id) - remove post
 * 
 * Status: PLACEHOLDER
 * =============================================================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
// TODO: Colin - Import your posts service
// import postsService from '../services/postsService';
import { useAuth } from './AuthContext';

// Create the context
const PostsContext = createContext(null);

export const PostsProvider = ({ children }) => {
  const { user } = useAuth();
  
  // State for posts
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch posts when user logs in
  useEffect(() => {
    if (user) {
      fetchPosts();
    } else {
      setPosts([]);
    }
  }, [user]);

  // TODO: Colin - Implement fetchPosts
  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const data = await postsService.getAll();
      // setPosts(data);
      console.log('Colin: Implement fetchPosts()');
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Colin - Implement createPost
  const createPost = async (content) => {
    try {
      // const newPost = await postsService.create(content);
      // setPosts(prev => [newPost, ...prev]);
      console.log('Colin: Implement createPost()', content);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to create post' };
    }
  };

  // TODO: Colin - Implement updatePost
  const updatePost = async (id, data) => {
    try {
      // const updatedPost = await postsService.update(id, data);
      // setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
      console.log('Colin: Implement updatePost()', id, data);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to update post' };
    }
  };

  // TODO: Colin - Implement deletePost
  const deletePost = async (id) => {
    try {
      // await postsService.delete(id);
      // setPosts(prev => prev.filter(post => post.id !== id));
      console.log('Colin: Implement deletePost()', id);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to delete post' };
    }
  };

  const value = {
    posts,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

// Hook for easy access
export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};

export default PostsContext;
