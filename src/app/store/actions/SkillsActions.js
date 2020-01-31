import { fetchSkills } from '../../services/SkillsService';

export const FETCH_SKILLS = 'FETCH_SKILLS';
export const FETCH_SKILLS_PENDING = 'FETCH_SKILLS_PENDING';
export const FETCH_SKILLS_FULFILLED = 'FETCH_SKILLS_FULFILLED';
export const FETCH_SKILLS_REJECTED = 'FETCH_SKILLS_REJECTED';

const fetchSkillsAction = () => ({
  type: FETCH_SKILLS,
  payload: fetchSkills()
});

export { fetchSkillsAction as fetchSkills };