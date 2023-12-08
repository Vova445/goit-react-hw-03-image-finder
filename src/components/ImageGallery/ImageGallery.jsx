import React from 'react';
import { nanoid } from 'nanoid';
import styles from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem key={nanoid()} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
