import React from 'react'

export const Modal: React.FC<{ open: boolean; onClose: () => void; children?: React.ReactNode }> = ({
  open,
  onClose,
  children,
}) => {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
