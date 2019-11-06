import { fetchUsers } from '../../services/UsersService';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';

const fetchUsersAction = () => ({
    type: FETCH_USERS,
    payload: fetchUsers()
});

export { fetchUsersAction as fetchUsers };