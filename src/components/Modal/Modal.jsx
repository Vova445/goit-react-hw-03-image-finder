import React, { useEffect } from 'react';
import styles from '../styles.module.css';

const Modal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const overlayClassName = `${styles.Overlay} ${isOpen ? styles.visible : ''}`;

  return (
    <div className={overlayClassName} onClick={onClose}>
      <div className={styles.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
