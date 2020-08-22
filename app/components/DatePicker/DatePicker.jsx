import React, { Component } from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { closePickerModal, closeModal } from 'redux/actions/modalAction';
import Icon from '../Icon/Icon';
import styles from './datePicker.module.css';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.dates || [],
    };
  }

  handlerOnSelect = event => {
    const dateString = format(event, 'YYYY-MM-DD');
    const selectedString = this.state.selected.map(date =>
      format(date, 'YYYY-MM-DD'),
    );

    if (selectedString.includes(dateString)) {
      const filtered = selectedString.filter(el => el !== dateString);

      const filteredOnDateFormat = filtered.map(date => new Date(date));
      return this.setState({ selected: filteredOnDateFormat });
    }
    return this.setState(state => ({ selected: [...state.selected, event] }));
  };

  handleCloseDatePicker = e => {
    e.preventDefault();
    const { closeModal } = this.props;
    this.props.handleOpenDatePicker(this.state.selected);
    closeModal();
  };

  render() {
    const { selected } = this.state;
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    );
    const MultipleDatesCalendar = withMultipleDates(Calendar);

    return (
      <>
        <div className={styles.pickerWrapper}>
          <InfiniteCalendar
            width={400}
            height={300}
            Component={MultipleDatesCalendar}
            interpolateSelection={defaultMultipleDateInterpolation}
            selected={selected}
            onSelect={this.handlerOnSelect}
            minDate={lastWeek}
            displayOptions={{
              showHeader: false,
            }}
            theme={{
              weekdayColor: '#284060',
            }}
            locale={{
              weekStartsOn: 1,
            }}
          />
          <button
            className={styles.pickerBtn}
            type="button"
            onClick={this.handleCloseDatePicker}
          >
            <Icon icon="Clear" />
          </button>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeModal: () => {
    dispatch(closeModal());
    dispatch(closePickerModal());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(DatePicker);
