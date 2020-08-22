import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AuthForm from 'components/AuthForm/AuthForm';
import { getToken } from 'redux/selectors/selectors';
import Header from 'components/Header/Header';

const Login = ({ token, match }) => (
  <>
    {token ? (
      <Redirect to="/dashboard" />
    ) : (
      <>
        <Header match={match} />
        <AuthForm />
      </>
    )}
  </>
);

Login.propTypes = {
  token: PropTypes.string,
  match: PropTypes.shape(),
};

Login.defaultProps = {
  token: null,
  match: {},
};

const mapStateToProps = state => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(Login);
