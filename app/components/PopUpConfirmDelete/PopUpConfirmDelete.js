import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTask } from 'redux/actions/tasksActions';
import { closeModal, closeDeleteModal } from 'redux/actions/modalAction';
import styles from './PopUpConfirmDelete.module.css';

const {
  container,
  title,
  btnsContainer,
  button,
  btnDelete,
  btnCancel,
} = styles;

const btnDeleteStyle = [button, btnDelete];
const btnCancelStyle = [button, btnCancel];

class PopUpConfirmDelete extends Component {
  state = {};

  handleDelete = (id, token) => {
    this.props.onDeleteTask(id, token);
    this.props.cancelDelete();
    this.props.history.push('/dashboard');
  };

  render() {
    const { id, cancelDelete } = this.props;

    return (
      <div className={container}>
        <h1 className={title}>Подтвердите удаление задачи</h1>
        <div className={btnsContainer}>
          <button
            type="button"
            className={btnDeleteStyle.join(' ')}
            onClick={() => this.handleDelete(id)}
          >
            Удалить
          </button>
          <button
            type="button"
            className={btnCancelStyle.join(' ')}
            onClick={cancelDelete}
          >
            Отмена
          </button>
        </div>
      </div>
    );
  }
}

const mSTP = state => ({
  id: state.id,
});

const mDTP = dispatch => ({
  onDeleteTask: id => dispatch(deleteTask(id)),
  cancelDelete: () => {
    dispatch(closeModal());
    dispatch(closeDeleteModal());
  },
});

export default connect(
  mSTP,
  mDTP,
)(PopUpConfirmDelete);
