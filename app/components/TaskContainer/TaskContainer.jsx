import React from 'react';
import windowSize from 'react-window-size';
import AddButton from 'components/AddButton/AddButon';
import TaskList from 'components/TaskList/TaskList';
import s from './TaskContainer.module.css';
import { CalendarButtonTablet } from '../CalendarButton/CalendarButton';

const TaskContainer = props => (
  <div className={s.taskContainer}>
    <div className={s.taskInnerContainer}>
      <TaskList />
      <AddButton />
    </div>
    {props.windowWidth >= 768 && props.windowWidth < 1024 ? (
      <CalendarButtonTablet />
    ) : (
      ''
    )}
  </div>
);

export default windowSize(TaskContainer);
