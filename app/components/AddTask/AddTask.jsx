import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openPickerModal } from 'redux/actions/modalAction';
import { warn } from 'utils/notification';
import { addTask } from 'redux/actions/formAction';
import Icon from 'components/Icon/Icon';
import DatePicker from 'components/DatePicker/DatePicker';
import Modal from 'components/Modal/Modal';
import style from './AddTask.module.css';

class AddTask extends Component {
  state = {
    title: '',
    description: '',
    dates: [],
  };

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
      this.setState({
        dates: convertedDates,
      });
    }
    if (!modal) {
      openModal();
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, dates } = this.state;

    if (title === '' || description === '') {
      warn('Все поля должны быть заполнены');
      return;
    }

    if (!this.props.error) {
      this.props.addForm({ title, description, dates });
      this.props.history.push('/dashboard');
      this.setState({ title: '', description: '' });
    }
    if (this.props.error) {
      this.setState({ error: this.props.error });
    }
  };

  handleDates = () => {
    const { dates } = this.state;
    if (dates.length === 0) {
      return dates;
    }
    return dates.map(el => el.date);
  };

  handleReset = () => {
    this.props.history.push('/dashboard');
    this.setState({ title: '', description: '' });
  };

  render() {
    const { title, description } = this.state;
    const { modal } = this.props;

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
          {modal && (
            <Modal>
              <DatePicker
                modal={modal}
                handleOpenDatePicker={this.handleOpenDatePicker}
                dates={this.handleDates()}
              />
            </Modal>
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
            <span>Описание не должно быть больше 200-ти символов</span>
          )}
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

AddTask.propTypes = {};
AddTask.defaultProps = {};

const mapStateToProps = state => ({
  error: state.form.error,
  modal: state.modal.modalPicker,
});

const mapDispatchToProps = dispatch => ({
  addForm: data => dispatch(addTask(data)),
  openModal: () => {
    dispatch(openPickerModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTask);
