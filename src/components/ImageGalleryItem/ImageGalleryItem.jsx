import React from 'react';
import styles from '../styles.module.css';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={`${styles.ImageGalleryItem} ${styles.ImageGalleryItemImage}`} onClick={() => onClick(image.largeImageURL)}>
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
