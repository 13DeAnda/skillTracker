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
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const addUser = ( data) => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.post('/users', data).then((res)=>{
        resolve(res);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const logIn = (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.get('/users?user='+username).then((res)=>{
        let error;
        if(res.data.length){
          const user = res.data[0];
          if(user.password === password){

            resolve({status: 200, data: user});
          }
          else{
            error = "Password does not match";
          }
        }
        else{
          error = "Username not on the database";
        }
        resolve({status: 401, message: error});

      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};
