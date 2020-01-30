import { combineReducers } from 'redux';
import {FetchUsersReducer, FetchUserReducer} from './FetchUsersReducer';
import {FetchSkillsReducer} from './FetchSkillsReducer';

export const AppReducer = combineReducers({
    users: FetchUsersReducer,
    user: FetchUserReducer,
    skills: FetchSkillsReducer
});