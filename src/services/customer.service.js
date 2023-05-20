import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // replace with your API URL

export const listCustomres = async (filter) => {
  const response = await axios.get(`${API_URL}/users?filter=${filter}`);
  if (response?.data){
    return response.data;
  }
  return false;
};
