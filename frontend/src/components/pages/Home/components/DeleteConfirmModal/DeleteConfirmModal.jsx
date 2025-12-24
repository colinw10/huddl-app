// DeleteConfirmModal.jsx - Styled delete confirmation modal

import { createPortal } from 'react-dom';
import './DeleteConfirmModal.scss';

function DeleteConfirmModal({ isOpen, onClose, onConfirm, isDeleting, title = "Delete Post?", message = "This can't be undone." }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="delete-modal-header">
          <div className="delete-modal-icon">
            {/* Shatter/dissolve icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
              <line x1="12" y1="22" x2="12" y2="17" opacity="0.5"/>
              <line x1="4.5" y1="9.5" x2="2" y2="7" opacity="0.3"/>
              <line x1="19.5" y1="9.5" x2="22" y2="7" opacity="0.3"/>
            </svg>
          </div>
          <h3 className="delete-modal-title">{title}</h3>
        </div>

        {/* Body */}
        <p className="delete-modal-message">
          {message}
        </p>

        {/* Footer */}
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-btn delete-modal-btn--cancel"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            className="delete-modal-btn delete-modal-btn--confirm"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteConfirmModal;
