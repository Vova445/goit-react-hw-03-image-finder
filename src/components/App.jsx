import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { searchImages } from './Api';
import styles from './styles.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchSubmit = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const newImages = await searchImages(query, page + 1);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return;

      setIsLoading(true);
      try {
        const fetchedImages = await searchImages(query, page);
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal isOpen={showModal} image={modalImage} onClose={handleCloseModal} />}
    </div>
  );
};
