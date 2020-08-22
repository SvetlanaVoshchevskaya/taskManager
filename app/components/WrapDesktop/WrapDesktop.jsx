import React from 'react';
import TaskContainer from 'components/TaskContainer/TaskContainer';
import Calendar from 'components/Calendar/Calendar';
import styles from './WrapDesktop.module.css';

const WrapperDesktop = () => (
  <div className={styles.dashboardWrap}>
    <div className={styles.tasksWrapper}>
      <TaskContainer />
    </div>
    <div className={styles.calendarWrapper}>
      {/* <Calendar /> */}
    </div>
  </div>
);

export default WrapperDesktop;
