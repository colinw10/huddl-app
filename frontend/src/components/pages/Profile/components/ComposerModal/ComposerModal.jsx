/**
 * ============================================================================
 * COMPOSER MODAL COMPONENT
 * ============================================================================
 * 
 * File: frontend/src/components/pages/Profile/components/ComposerModal/ComposerModal.jsx
 * Assigned to: CRYSTAL
 * 
 * Modal for creating new posts.
 * 
 * TODO:
 * - [ ] Post type selector (text, image, mood, activity)
 * - [ ] Content textarea
 * - [ ] Image upload option
 * - [ ] Submit to API
 * - [ ] Loading state during submission
 * - [ ] Close button/escape key
 * 
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 *   - onPostCreated: function(post)
 * 
 * ============================================================================
 */

import { useState } from 'react';
import './ComposerModal.scss';

const ComposerModal = ({ isOpen, onClose, onPostCreated }) => {
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Submit post to API
    // TODO: Call onPostCreated with new post
    // TODO: Close modal
  };

  if (!isOpen) return null;

  return (
    <div className="composer-modal-overlay" onClick={onClose}>
      <div className="composer-modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          {/* TODO: Post type selector */}
          {/* TODO: Content textarea */}
          {/* TODO: Image upload */}
          {/* TODO: Submit button */}
          <p>ComposerModal - Implement me!</p>
        </form>
      </div>
    </div>
  );
};

export default ComposerModal;
