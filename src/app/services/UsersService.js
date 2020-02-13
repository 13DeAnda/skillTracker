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

export const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.put('/users/'+id, data).then((res)=>{
        console.log("succesfully updating the user", res);
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};