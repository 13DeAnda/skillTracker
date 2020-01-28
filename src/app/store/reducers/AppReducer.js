import { combineReducers } from 'redux';
import {FetchUsersReducer} from './FetchUsersReducer';
import {FetchSkillsReducer} from './FetchSkillsReducer';

export const AppReducer = combineReducers({
    users: FetchUsersReducer,
    skills: FetchSkillsReducer
});