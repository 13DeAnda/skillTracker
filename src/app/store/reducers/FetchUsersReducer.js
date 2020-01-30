import {
    FETCH_USERS_PENDING,
    FETCH_USERS_FULFILLED,
    FETCH_USERS_REJECTED,
    FETCH_USER_PENDING,
    FETCH_USER_FULFILLED,
    FETCH_USER_REJECTED} from '../actions/UsersActions';

const initialState = {
    users: [],
    user: {},
    fetching: false,
    fetched: false,
    failed: false
};

export const FetchUsersReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        users: [],
        fetching: true,
        fetched: false,
        failed: false
      };
    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: action.payload,
        fetching: false,
        fetched: true,
        failed: false
      };
    case FETCH_USERS_REJECTED:
      return {
        ...state,
        users: [],
        fetching: false,
        fetched: false,
        failed: true
      };
    default:
      return state;
  }
};

export const FetchUserReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_PENDING:
      return {
        ...state,
        user: {},
        fetching: true,
        fetched: false,
        failed: false
      };
    case FETCH_USER_FULFILLED:
      return {
        ...state,
        user: action.payload,
        fetching: false,
        fetched: true,
        failed: false
      };
    case FETCH_USER_REJECTED:
      return {
        ...state,
        users: {},
        fetching: false,
        fetched: false,
        failed: true
      };
    default:
      return state;
  }
};