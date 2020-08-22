import React, { Component } from 'react';
import { Calendar } from 'lib/Calendar';
import moment from 'moment';
import 'moment/locale/ru';
import CalendarRenderDay from 'components/CalendarRenderDay/CalendarRenderDay';
import Icon from '../Icon/Icon';

class TaskCalendar extends Component {
  state = {
    date: moment(),
  };

  render() {
    return (
      <Calendar
        onChangeMonth={date => this.setState({ date })}
        date={this.state.date}
        onPickDate={() => {}}
        renderDay={props => <CalendarRenderDay {...props} />}
        renderHeader={({ date, onPrevMonth, onNextMonth }) => (
          <div className="Calendar-header">
            <button onClick={onPrevMonth} type="button">
              <Icon className="Calendar-icon" icon="Back" />
            </button>
            <div className="Calendar-header-currentDate">
              {date.format('MMMM YYYY')}
            </div>
            <button onClick={onNextMonth} type="button">
              <Icon className="Calendar-icon" icon="Next" />
            </button>
          </div>
        )}
      />
    );
  }
}

export default TaskCalendar;
