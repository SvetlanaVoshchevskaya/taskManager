import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import { getIdSuccess } from 'redux/actions/getIdAction';
import { completeTask } from 'redux/actions/tasksActions';
import Icon from 'components/Icon/Icon';
import { getToken, getTaskId } from 'redux/selectors/selectors';
import styles from './Task.module.css';

const refactoringProps = props => {
  const { dates, title, description, isRepeat, _id } = props.task;

  const refactoring = {
    taskHeader: !title ? 'назва_таски' : title,
    taskDescription: !description ? 'опис_таски' : description,
    isLoop: isRepeat,
    loopDates: dates
      .reduce((acc, elem) => {
        acc.push(new Date(elem.date).getDate());

        return acc;
      }, [])
      .join(','),
    dates,

    taskNumber: !props.taskNumber ? 'номер_таски' : props.taskNumber,
    taskId: _id,
  };
  return refactoring;
};

class Task extends Component {
  render() {
    const {
      taskNumber,
      taskHeader,
      taskDescription,
      isLoop,
      loopDates,
      taskId,
      dates,
    } = refactoringProps(this.props);
    const windowWidth = this.props.windowWidth ? this.props.windowWidth : null;
    const { onEdit, onComplete } = this.props;

    return (
      <>
        <div className={styles.task}>
          <div
            className={
              dates[0].isComplete
                ? styles.taskHeaderInactive
                : styles.taskHeader
            }
          >
            <div className={styles.numberContainer}>
              <p className={styles.headerNumber}>{taskNumber}. </p>
            </div>
            <div className={styles.textContainer}>
              <p className={styles.headerText}>{taskHeader}</p>
            </div>
          </div>
          <div className={styles.taskBody}>
            <p>{taskDescription}</p>
          </div>
          <div className={styles.taskControls}>
            <div className={styles.taskControlsRepeat}>
              {isLoop && (
                <>
                  <button
                    type="button"
                    disabled={!!dates[0].isComplete}
                    className={
                      dates[0].isComplete
                        ? styles.taskControlsRepeatBtnInactive
                        : styles.taskControlsRepeatBtn
                    }
                  >
                    <Icon icon="Loop" />
                  </button>
                  <p
                    className={
                      dates[0].isComplete
                        ? styles.taskControlsDatesInactive
                        : styles.taskControlsDates
                    }
                  >
                    {loopDates}
                  </p>
                </>
              )}
            </div>

            <div className={styles.taskControlsCompleteContainer}>
              <Link to="/dashboard/edit">
                <button
                  className={styles.taskControlsEdit}
                  type="button"
                  onClick={() => onEdit(taskId)}
                >
                  <Icon icon="Edit" />
                </button>
              </Link>
              {windowWidth > 768 ? <p>Редактировать</p> : null}
              <button
                type="button"
                disabled={!!dates[0].isComplete}
                className={
                  dates[0].isComplete
                    ? styles.taskControlsDoneInactive
                    : styles.taskControlsDone
                }
                onClick={() =>
                  onComplete(
                    {
                      sectionDate: this.props.date,
                      taskDates: this.task.dates,
                    },
                    taskId,
                  )
                }
              >
                <Icon icon="Done" />
              </button>
              {windowWidth > 768 &&
                (loopDates[0].isComplete ? <p>Выполнено</p> : <p>Выполнить</p>)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    taskNumber: PropTypes.string,
    isRepeat: PropTypes.bool.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    dates: PropTypes.arrayOf(
      PropTypes.shape({
        isComplete: PropTypes.bool,
        date: PropTypes.string,
      }),
    ).isRequired,
  }),
  onEdit: PropTypes.func,
  onComplete: PropTypes.func,
};

Task.defaultProps = {
  task: {},
  onEdit: () => {},
};

const mSTP = state => ({
  token: getToken(state),
  id: getTaskId(state),
});

const mDTP = dispatch => ({
  onComplete: (data, taskId) => dispatch(completeTask(data, taskId)),
  onEdit: taskId => dispatch(getIdSuccess(taskId)),
});

export default compose(
  connect(
    mSTP,
    mDTP,
  ),
  windowSize,
)(Task);
