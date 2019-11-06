import skills from './mockData/skills.json';


const simulateError = false;

export const fetchSkills = () => {
    return new Promise((resolve, reject) => {
    // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch users');
            } else {
                resolve(skills);
            }
        }, 1000);
    });
};
