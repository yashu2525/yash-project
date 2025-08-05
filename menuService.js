import axios from 'axios';

export const getMenuItems = () => {
  return axios.get('/menu.json')
    .then(res => res.data)
    .catch(error => {
      console.error("Failed to load menu:", error);
      return [];
    });
};
