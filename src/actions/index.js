
import { REQUEST_USERS, FAILED_USER_FETCH, GET_USERS, FILTER_USERS, CLEAR_FILTER} from '../reducers/index';
import { User } from '../data-types/user';
import { isArray } from 'util';
import axios from 'axios';

const formatUsers = (users) => {
  if (!isArray(users)) {
    users = [users];
  }
  return users.map(user => User(user));
};

export const requestUsers = state => ({
  type: REQUEST_USERS,
  state
});

export const failedUserFetch = (state) => ({
  type: FAILED_USER_FETCH,
  state
});

export const receivedUsers = (state, users) => ({
  type: GET_USERS,
  state,
  users
});

export const filterUsers = (searchString) => {
  return ({
    type: FILTER_USERS,
    searchString
  });
};

export const clearFilter = () => {
  return ({
    type: CLEAR_FILTER
  });
};

export const fetchUsers = state => dispatch => {
  dispatch(requestUsers(state));
  return axios.get(`http://uinames.com/api/?ext&amount=100`)
    .then(response => response.data)
    .then(users => dispatch(receivedUsers(state, formatUsers(users))))
    .catch(error => dispatch(failedUserFetch(state)));
};
