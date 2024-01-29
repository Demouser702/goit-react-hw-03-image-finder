import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  handleClick = () => {
    const { id, onClick } = this.props;
    onClick(id);
  };

  render() {
    const { webformatURL, id } = this.props;

    return (
      <li className={styles.ImageGalleryItem} onClick={this.handleClick}>
        <img src={webformatURL} alt={`${id}`} />
      </li>
    );
  }
}
