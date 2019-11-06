import { combineReducers } from 'redux';
import {FetchUsersReducer} from './FetchUsersReducer';

export const AppReducer = combineReducers({
    users: FetchUsersReducer
});