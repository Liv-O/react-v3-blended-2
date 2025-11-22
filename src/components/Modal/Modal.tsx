import { createPortal } from 'react-dom';
import styled from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);

      document.body.style.overflow = '';
    };
  }, [closeModal]);

  return createPortal(
    <div
      className={styled.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}>
      <div className={styled.modal}>
        <button
          className={styled.closeButton}
          aria-label="Close modal"
          onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
