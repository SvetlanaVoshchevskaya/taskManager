import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchTasks } from '../../redux/actions/tasksActions';
import styles from './SearchTasks.module.css';

class SearchTasks extends Component {
  state = { search: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <i className="fa fa-search" aria-hidden="true" />
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          name="search"
          className={styles.searchInput}
          placeholder="Поиск"
        />
      </form>
    );
  }
}

const mDTP = dispatch => ({
  onSubmit: search => dispatch(searchTasks(search)),
});

export default connect(
  null,
  mDTP,
)(SearchTasks);
