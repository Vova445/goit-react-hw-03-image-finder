import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { searchImages } from './Api'; 
import styles from './styles.module.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      images: [],
      page: 1,
      totalImages: 0,
      loading: false,
      modalImage: '',
      showModal: false,
    };
  }

  handleSearchSubmit = (name) => {
    if (this.state.name !== name) {
      this.setState({ name, page: 1, images: [], totalImages: 0 }, this.fetchData);
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchData);
  };

  handleImageClick = (imageUrl) => {
    this.setState({ modalImage: imageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { name, page } = this.state;

    if (!name) return;

    this.setState({ loading: true });

    searchImages(name, page)
      .then(({ images, totalImages }) => {
        if (totalImages) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...images],
            totalImages,
          }));
        } else {
          alert('Нічого не знайдено');
        }
      })
      .catch((error) => error)
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { images, loading, showModal, modalImage } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal isOpen={showModal} image={modalImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}
