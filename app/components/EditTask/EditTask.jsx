import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  openModal,
  openDeleteModal,
  openPickerModal,
} from 'redux/actions/modalAction';
import style from './EditTask.module.css';
import Icon from '../Icon/Icon';
import { getTasks } from '../../redux/selectors/selectors';
import { editTask } from '../../redux/actions/tasksActions';
import { warn } from '../../utils/notification';
import DatePicker from '../DatePicker/DatePicker';
import Modal from '../Modal/Modal';

class EditTask extends Component {
  state = {
    title: '',
    description: '',
    dates: [{ date: '09-28-2019' }],
  };

  componentDidMount() {
    const { id, tasks, history } = this.props;
    if (!tasks) {
      history.push('/dashboard');
    }

    const newState = tasks.find(el => el._id === id);
    this.setState({ ...newState });
  }

  handleChange = event => {
    const { title, description } = this.state;
    if (title.length > 50 || description.length > 200) {
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOpenDatePicker = dates => {
    const { openModal, modal } = this.props;

    if (modal) {
      const convertedDates = dates.map(date => ({ date }));
      this.setState(state => ({
        ...state,
        dates: convertedDates,
      }));
    }
    if (!modal) {
      openModal();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, dates } = this.state;
    const { token, id, tasks } = this.props;
    const editTask = tasks.find(el => el._id === id);

    if (title === '' || description === '') {
      warn('Все поля должны быть заполнены');
      return;
    }

    if (
      !this.props.error ||
      title !== editTask.title ||
      description !== editTask.description ||
      dates.length !== editTask.dates.length
    ) {
      this.props.editTask({ title, description, dates }, token, id);
      this.props.history.push('/dashboard');
      this.setState({ title: '', description: '' });
    }
    if (
      this.props.error ||
      title === editTask.title ||
      description === editTask.description ||
      dates.length === editTask.dates.length
    ) {
      this.setState({ error: this.props.error });
    }
  };

  handleReset = () => {
    this.props.history.push('/dashboard');
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, description } = this.state;
    const { confirmDelete, modal } = this.props;
    return (
      <div className={style.bodybg}>
        <form onSubmit={this.handleSubmit} className={style.formBg}>
          <input
            name="title"
            type="text"
            value={title}
            onChange={this.handleChange}
            placeholder="#1 Введите название задачи"
            className={style.title}
          />
          {title.length > 50 && (
            <span className={style.errorSpan}>
              Описание не должно быть больше 50-ти символов
            </span>
          )}
          <div
            className={style.dataPickerContainer}
            onClick={this.handleOpenDatePicker}
          >
            <Icon icon="Calendar" className={style.formIcon} />
            <p className={style.dataPickerTitle}>Выберете дату</p>
            <Icon icon="ArrowRight" className={style.formIcon} />
          </div>
          {modal ? (
            <Modal>
              <DatePicker
                modal={modal}
                handleOpenDatePicker={this.handleOpenDatePicker}
              />
            </Modal>
          ) : (
            ''
          )}
          <label htmlFor="description" className={style.labelDescription}>
            Краткое описание:
          </label>
          <textarea
            name="description"
            wrap="virtual"
            className={style.textArea}
            onChange={this.handleChange}
            value={description}
            placeholder="Введите описание задачи"
          />
          {description.length > 200 && (
            <span className={style.errorSpan}>
              Описание не должно быть больше 200-ти символов
            </span>
          )}
          <button type="button" className={style.deleteBtn}>
            <Icon
              icon="Delete"
              className={style.formIconDelete}
              onClick={confirmDelete}
            />
          </button>
          <div className={style.battonContainer}>
            <button type="submit" className={style.saveBtn}>
              Сохранить
            </button>
            <button
              type="reset"
              className={style.resetBtn}
              onClick={this.handleReset}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.id,
  error: state.form.error,
  tasks: getTasks(state, ''),
  modal: state.modal.modalPicker,
});

const mapDispatchToProps = dispatch => ({
  editTask: (data, id) => dispatch(editTask({ data, id })),
  confirmDelete: () => {
    dispatch(openModal());
    dispatch(openDeleteModal());
  },
  openModal: () => {
    dispatch(openPickerModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTask);
