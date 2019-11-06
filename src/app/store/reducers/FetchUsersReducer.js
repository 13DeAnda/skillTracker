import {
    FETCH_USERS_PENDING,
    FETCH_USERS_FULFILLED,
    FETCH_USERS_REJECTED
} from '../actions/UsersActions';

const initialState = {
    users: [],
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