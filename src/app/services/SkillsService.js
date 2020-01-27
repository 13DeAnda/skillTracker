
import apiInstance from "./apiInstance";

export const fetchSkills = () => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.get('/users').then((res)=>{
        console.log("the users", res);
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};
