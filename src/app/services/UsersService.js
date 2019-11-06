import users from './mockData/users.json';
const simulateError = false;

export const fetchUsers = () => {
    return new Promise((resolve, reject) => {
    // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch users');
            } else {
                resolve(users);
            }
        }, 1000);
    });
};