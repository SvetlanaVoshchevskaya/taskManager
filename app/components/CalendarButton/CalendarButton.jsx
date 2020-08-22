import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/Icon/Icon';
import styles from './calendarButton.module.css';

export const CalendarButtonMobile = () => (
  <Link to="/dashboard/calendar">
    <Icon icon="Calendar" className={styles.calendarSVG} />
  </Link>
);

export const CalendarButtonTablet = () => (
  <Link to="/dashboard/calendar" className={styles.btnCalendar}>
    <Icon icon="Calendar" className={styles.calendarSVG} />
    <span className={styles.btnCalendarText}>Перейти в календарь</span>
  </Link>
);

export const GoToTasks = () => (
  <Link to="/dashboard" className={styles.btnCalendar}>
    <Icon icon="List" className={styles.calendarSVG} />
    <span className={styles.btnCalendarText}>Перейти к задачам</span>
  </Link>
);
