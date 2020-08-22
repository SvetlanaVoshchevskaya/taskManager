import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authRequest } from 'redux/actions/authActions';
import * as notify from 'utils/notification';
import styles from './AuthForm.module.css';
import { getError } from './authFormSelectors';

const INITIAL_STATE = {
  nickname: '',
  password: '',
};

class AuthForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { error } = this.props;

    e.preventDefault();

    const { nickname, password } = this.state;

    if (nickname.length < 5 || nickname.length > 15) {
      notify.error('The nickname should be between 5 and 15 symbols');
      return;
    }

    if (password.length < 5 || password.length > 12) {
      notify.error('The password should be between 5 and 12 symbols');
      return;
    }

    this.props.onSubmit({ ...this.state });

    if (error) {
      this.setState(state => ({ ...state, password: '' }));
    }
  };

  render() {
    const { nickname, password } = this.state;

    return (
      <div className={styles.wrapper}>
        <form className={styles.registrationForm} onSubmit={this.handleSubmit}>
          <h2 className={styles.title}>
            Введите данные для регистрации или логинизации
          </h2>

          <label className={styles.label}>
            <span className={styles.labelText}>Уникальный ник:</span>
            <input
              className={styles.input}
              value={nickname}
              name="nickname"
              onChange={this.handleChange}
            />
          </label>

          <label className={styles.label}>
            <span className={styles.labelText}> Пароль: </span>
            <input
              className={styles.password}
              type="password"
              autoComplete="current-password"
              size="12"
              onChange={this.handleChange}
              value={password}
              name="password"
              id=""
            />
          </label>

          <button className={styles.button} type="submit">
            <span className={styles.buttonText}> Вперед! </span>
          </button>
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  nickname: PropTypes.string,
  password: PropTypes.string,
  onSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  error: PropTypes.string,
};

AuthForm.defaultProps = {
  nickname: '',
  password: '',
  error: '',
  onSubmit: () => {},
  handleChange: () => {},
};

const mapStateToProps = state => ({
  error: getError(state),
});

const mapDispatchToProps = {
  onSubmit: authRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthForm);
