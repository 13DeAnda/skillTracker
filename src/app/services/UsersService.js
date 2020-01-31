import apiInstance from './apiInstance';

export const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.get('/users').then((res)=>{
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.get('/users/'+id).then((res)=>{
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};