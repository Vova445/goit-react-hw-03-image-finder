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
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      modalImage: '',
      showModal: false,
    };
  }

  handleSearchSubmit = async (newQuery) => {
    const { query } = this.state;
    if (newQuery !== query) {
      this.setState({ query: newQuery, page: 1, images: [] });
    }
  };
  

  

  handleLoadMore = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const newImages = await searchImages(query, page + 1);
      this.setState((prevState) => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageClick = (imageUrl) => {
    this.setState({ modalImage: imageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true });
    try {
      const fetchedImages = await searchImages(query, page);
      this.setState((prevState) => ({
        images: [...prevState.images, ...fetchedImages],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, showModal, modalImage } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal isOpen={showModal} image={modalImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}