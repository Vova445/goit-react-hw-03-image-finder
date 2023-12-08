import styles from '../styles.module.css';
import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'; 

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} onClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
