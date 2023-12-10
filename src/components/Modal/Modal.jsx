import React, { Component } from 'react';
import styles from '../styles.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleImageClick = (e) => {
    e.stopPropagation();
  };

  render() {
    const { isOpen, image, onClose } = this.props;

    return (
      <div className={`${styles.Overlay} ${isOpen ? styles.visible : ''}`} onClick={onClose}>
        <div className={styles.Modal}>
          <img src={image} alt="" onClick={this.handleImageClick} />
        </div>
      </div>
    );
  }
}

export default Modal;
