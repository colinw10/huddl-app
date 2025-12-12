/**
 * ============================================================================
 * MEDIA LIGHTBOX COMPONENT
 * ============================================================================
 * 
 * File: MediaLightbox.jsx
 * Assigned to: COLIN
 * 
 * Modal to display images/media in fullscreen.
 * 
 * TODO:
 * - [ ] Overlay with dark background
 * - [ ] Display image at full size
 * - [ ] Close on click outside or escape key
 * - [ ] Navigation arrows if multiple images
 * - [ ] Zoom functionality
 * 
 * Props:
 *   - images: array of image URLs
 *   - currentIndex: number
 *   - onClose: function
 *   - onNavigate: function(direction)
 * 
 * ============================================================================
 */

import { useEffect } from 'react';
import './MediaLightbox.scss';

const MediaLightbox = ({ images, currentIndex, onClose, onNavigate }) => {
  useEffect(() => {
    // TODO: Handle escape key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="media-lightbox" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* TODO: Previous button */}
        {/* TODO: Image display */}
        {/* TODO: Next button */}
        {/* TODO: Close button */}
        <p>MediaLightbox - Implement me!</p>
      </div>
    </div>
  );
};

export default MediaLightbox;
