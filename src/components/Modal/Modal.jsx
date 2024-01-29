import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  handleOutsideClick = e => {
    if (e.currentTarget === e.target) {
      this.props.handleClose();
    }
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOutsideClick, false);
  }

  render() {
    const { isOpen, children } = this.props;

    if (!isOpen) {
      return;
    }

    return (
      <div className={styles.overlay} onClick={this.handleOutsideClick}>
        <dialog className={styles.modal}>
          <main className={styles.content}>{children}</main>
        </dialog>
      </div>
    );
  }
}
export default Modal;
