import {
  FETCH_SKILLS_PENDING,
  FETCH_SKILLS_FULFILLED,
  FETCH_SKILLS_REJECTED
} from '../actions/SkillsActions';

const initialState = {
  skills: {},
  fetching: false,
  fetched: false,
  failed: false
};

export const FetchSkillsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_SKILLS_PENDING:
      return {
        ...state,
        skills: {},
        fetching: true,
        fetched: false,
        failed: false
      };
    case FETCH_SKILLS_FULFILLED:
      return {
        ...state,
        skills: action.payload,
        fetching: false,
        fetched: true,
        failed: false
      };
    case FETCH_SKILLS_REJECTED:
      return {
        ...state,
        skills: {},
        fetching: false,
        fetched: false,
        failed: true
      };
    default:
      return state;
  }
};