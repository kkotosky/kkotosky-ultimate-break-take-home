import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, filterUsers } from '../actions';
import UserCard from '../components/user-card/user-card.component';
import Filter from '../components/filter-bar/filter.component';
import LoadingSpinner from '../components/loading-spinner/loading-spinner.component';
import { LOADING_STATES } from '../components/loading-spinner/loading-spinner.component';

import './app.scss';

class App extends Component {
  static propTypes = {
    pristineUsers: PropTypes.array,
    filteredUsers: PropTypes.array,
    loadingUsersState: PropTypes.string,
    onFilter: PropTypes.func,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const {
      filteredUsers,
      loadingUsersState,
      onFilter
    } = this.props;

    return (
      <div>
        <div className="title-container">
          <h1> Kevin Kotosky - Ultimate Break take home - User Base </h1>
        </div>

        <div className={`loading-container ${loadingUsersState === LOADING_STATES.completed && 'hide'}`}>
          { (loadingUsersState !== LOADING_STATES.completed) &&
            <LoadingSpinner loadingState={loadingUsersState}
                            loadingMessage='Loading user base'
                            failedMessage='Failed to load user base. Please refresh the page to try again.'>
            </LoadingSpinner>}
        </div>

        { loadingUsersState === LOADING_STATES.completed && filteredUsers &&
          <div className="row filter-container">
            <Filter className="col-md-6"
                    placeholder='Name, region, email, phone...'
                    onFilter={(filterString) => onFilter(filterString)}></Filter>
          </div>
        }

        <div className="card-container">
          {loadingUsersState === LOADING_STATES.completed &&
            filteredUsers && !!filteredUsers.length && filteredUsers.map((user, id) => {
            return <UserCard key={id} user={user}> </UserCard>
          })}

          {loadingUsersState === LOADING_STATES.completed && !filteredUsers.length &&
            <span className="card-container__empty-state"> No results found :( </span>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    pristineUsers,
    filteredUsers,
    loadingUsersState
  } = state.userHandling;

  return {
    pristineUsers,
    filteredUsers,
    loadingUsersState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFilter: searchString => {
      return dispatch(filterUsers(searchString))
    },
    fetchUsers: () => {
      return dispatch(fetchUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
