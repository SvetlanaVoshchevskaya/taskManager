import React from 'react';
import Calendar from 'components/Calendar/Calendar';
import { GoToTasks } from 'components/CalendarButton/CalendarButton';
import styles from './calendarPage.module.css';

const CalendarPage = () => (
  <div className={styles.calendarWrap}>
    <Calendar />
    <GoToTasks />
  </div>
);

export default CalendarPage;
