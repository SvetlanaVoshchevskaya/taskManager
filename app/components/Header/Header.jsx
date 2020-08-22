import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import windowSize from 'react-window-size';

import Icon from 'components/Icon/Icon';
import SearchTasks from 'components/SearchTasks/SearchTasks';
import { CalendarButtonMobile } from 'components/CalendarButton/CalendarButton';
import {
  openInfoModal,
  openModal,
  openCalendarModal,
} from 'redux/actions/modalAction';
import { logout } from 'redux/actions/authActions';
import { getInfoModal, getNickname } from 'redux/selectors/selectors';
import { clearSearch } from 'redux/actions/tasksActions';
import styles from './Header.module.css';

class Header extends Component {
  state = {};

  render() {
    const {
      match,
      location,
      openModal,
      logout,
      nickname,
      windowWidth,
    } = this.props;

    return (
      <>
        {match.path.includes('/login') && (
          <div className={styles.wrapperForLogin}>
            <h1
              className={`${
                styles.LoginRegisterLogo
              } Header-LoginRegister-Logo-Mob`}
            >
              TaskManager
            </h1>
            <h2
              className={`${
                styles.LoginRegisterTagline
              } Header-LoginRegister-Tagline-Mob`}
            >
              Организуй свои дела
            </h2>
          </div>
        )}

        {/* =====================DASHBOARD */}
        {match.path.includes('dashboard') && (
          <div className={styles.wrapperForDashboard}>
            <Link to="/dashboard" onClick={this.props.onMainPage}>
              <h1
                className={`${styles.DashboardLogo} Header-Dashboard-Logo-Mob`}
              >
                TaskManager
              </h1>
            </Link>
            <nav className={`${styles.nav} Header-Dashboard-UserName-Mob`}>
              <div className={styles.UserNameLetter}>
                {nickname[0].toUpperCase()}
              </div>
              <div className={styles.UserName}>{nickname}</div>
              <span className={styles.logoutSign}>
                <Icon
                  icon="Logout"
                  onClick={logout}
                  className={styles.exitBtn}
                />
              </span>
              <span className={styles.exitWord} onClick={logout}>
                Выйти
              </span>
            </nav>

            <div
              className={`${styles.informBtn}  Header-Dashboard-UserName-Mob`}
            >
              {windowWidth < 768 && location.pathname === '/dashboard' && (
                <span className={styles.calendarSign}>
                  <CalendarButtonMobile />
                </span>
              )}
              <span className={styles.informSignWrapper}>
                <Icon
                  icon="Info"
                  onClick={openModal}
                  className={styles.informSign}
                />
              </span>
              {/* {location.pathname === '/dashboard' && <SearchTasks />} */}
              {location.pathname === '/dashboard' && (
                <span className={styles.searchWrapper}>
                  <SearchTasks />
                </span>
              )}
            </div>
          </div>
        )}
        {/* =====================DASHBOARD */}
      </>
    );
  }
}

const mapStateToProps = state => ({
  modal: getInfoModal(state),
  nickname: getNickname(state),
});

const mapDispatchToProps = dispatch => ({
  openModal: () => {
    dispatch(openModal());
    dispatch(openInfoModal());
  },
  openCalendar: () => {
    dispatch(openModal());
    dispatch(openCalendarModal());
  },
  logout: () => dispatch(logout()),
  onMainPage: () => dispatch(clearSearch()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  windowSize,
)(Header);
