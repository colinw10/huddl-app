/**
 * ============================================================================
 * DELETE CONFIRM MODAL COMPONENT
 * ============================================================================
 * 
 * File: DeleteConfirmModal.jsx
 * Assigned to: NATALIA
 * 
 * Confirmation modal before deleting a post.
 * 
 * TODO:
 * - [ ] Warning message
 * - [ ] Confirm/Cancel buttons
 * - [ ] Handle delete action
 * - [ ] Close on escape key
 * 
 * Props:
 *   - isOpen: boolean
 *   - onClose: function
 *   - onConfirm: function
 *   - postContent: string (preview of what's being deleted)
 * 
 * ============================================================================
 */

import './DeleteConfirmModal.scss';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, postContent }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay" onClick={onClose}>
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        {/* TODO: Warning message */}
        {/* TODO: Post preview */}
        {/* TODO: Cancel button */}
        {/* TODO: Confirm delete button */}
        <p>DeleteConfirmModal - Implement me!</p>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
