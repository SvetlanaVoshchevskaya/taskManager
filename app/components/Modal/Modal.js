import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
  closeModal,
  closeInfoModal,
  closeCalendarModal,
  closeDeleteModal,
  closePickerModal,
} from 'redux/actions/modalAction';
import styles from './Modal.module.css';

class Modal extends Component {
  state = {};

  backdropeRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    const { closeModal } = this.props;
    if (e.code !== 'Escape') return;
    closeModal();
  };

  handleBackDropClick = e => {
    const { closeModal } = this.props;
    const { current } = this.backdropeRef;
    if (current && e.target !== current) return;
    closeModal();
  };

  render() {
    return (
      <div
        className={styles.overlay}
        onClick={this.handleBackDropClick}
        ref={this.backdropeRef}
      >
        {this.props.children}
      </div>
    );
  }
}

const mDTP = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
    // возможно эти не нужны проверь позже
    dispatch(closeInfoModal());
    dispatch(closeCalendarModal());
    dispatch(closeDeleteModal());
    dispatch(closePickerModal());
  },
});

export default connect(
  null,
  mDTP,
)(Modal);
