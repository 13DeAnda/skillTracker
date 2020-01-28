
import apiInstance from "./apiInstance";

export const fetchSkills = () => {
  return new Promise((resolve, reject) => {
    try {
      apiInstance.get('/skills').then((res)=>{
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    } catch (e) {
      reject(e);
    }
  });
};
