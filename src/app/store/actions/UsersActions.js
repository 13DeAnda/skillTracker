import { fetchUsers, fetchUser } from '../../services/UsersService';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';

const fetchUsersAction = () => ({
    type: FETCH_USERS,
    payload: fetchUsers()
});

const fetchUserAction = (id) => ({
  type: FETCH_USER,
  payload: fetchUser(id)
});

export { fetchUsersAction as fetchUsers };
export { fetchUserAction as fetchUser };