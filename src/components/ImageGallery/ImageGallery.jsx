import React, { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isImageModalOpen: false,
      selectedImage: null,
      isLoading: false,
    };
  }

  handleOpenModal = async selectedImage => {
    try {
      this.setState({
        isImageModalOpen: true,
        selectedImage: selectedImage,
        isLoading: true,
      });
      // Your async logic here
    } catch (error) {
      console.error('Error opening modal:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadingImage = () => {
    this.setState({ isLoading: false });
  };

  handleCloseModal = () => {
    this.setState({
      isImageModalOpen: false,
      selectedImage: null,
      isLoading: false,
    });
  };

  render() {
    const { images } = this.props;
    const { isImageModalOpen, selectedImage, isLoading } = this.state;

    if (images.length === 0) {
      return <div className="text_area">Start your search</div>;
    }

    if (isLoading) {
      return <Loader />;
    }

    return (
      <ul className={styles.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImage={largeImageURL}
            onClick={() => this.handleOpenModal({ id, largeImageURL })}
          />
        ))}

        {isImageModalOpen && selectedImage && (
          <Modal isOpen={isImageModalOpen} handleClose={this.handleCloseModal}>
            {isLoading && <Loader />}
            <img
              src={selectedImage.largeImageURL}
              alt="Large version"
              onLoad={() => this.setState({ isLoading: false })}
            />
          </Modal>
        )}
      </ul>
    );
  }
}
