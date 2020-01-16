import { combineReducers } from 'redux';
import { LOADING_STATES } from '../components/loading-spinner/loading-spinner.component';

export const REQUEST_USERS = 'REQUEST_USERS';
export const GET_USERS = 'GET_USERS';
export const FILTER_USERS = 'FILTER_USERS';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const FAILED_USER_FETCH = 'FAILED_USER_FETCH';

const initialState = {
  pristineUsers: [],
  filteredUsers: [],
  loadingUsersState: LOADING_STATES.loading
};

const filterUsers = (users, searchString) => users.filter(user => {
  const lowerCaseSearch = searchString.toLowerCase();
  return !searchString ||
    user.getFullName().toLowerCase().indexOf(lowerCaseSearch) >= 0 ||
    user.region.toLowerCase().indexOf(lowerCaseSearch) >= 0 ||
    user.email.toLowerCase().indexOf(lowerCaseSearch) >= 0 ||
    user.phone.toLowerCase().indexOf(lowerCaseSearch) >= 0
});

const userHandling = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        loadingUsersState: LOADING_STATES.loading
      }
    case GET_USERS:
      return Object.assign({}, {
        ...state,
        loadingUsersState: LOADING_STATES.completed,
        pristineUsers: action.users,
        filteredUsers: action.users
      });
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: filterUsers(state.pristineUsers, action.searchString)
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filteredUsers: state.pristineUsers
      }
    case FAILED_USER_FETCH:
      return {
        ...state,
        loadingUsersState: LOADING_STATES.failed
      }
    default:
      return initialState
  }
};

const rootReducer = combineReducers({
  userHandling
});

export default rootReducer;
