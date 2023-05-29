import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // replace with your API URL

// function to get all admins
/* export const getAllParkings = async () => {
  const response = await axios.get(`${API_URL}/parkings`);
  if (response?.data){
    return response.data;
  }
  return false;
}; */


// payload ={email , password}
// Login
export const loginAdmin = async (payload) => {
  const response = await axios.post(`${API_URL}/admins/login` , payload );
  if (response?.data){
    return response.data;
  }
  return false;
};


export const findAdmin = async (id) => {
  const response = await axios.get(`${API_URL}/admins/${id}` );
  if (response?.data){
    return response.data;
  }
  return false;
};

export const editAdmin = async (payload) => {
  const response = await axios.put(`${API_URL}/admins/update` , payload );
  if (response?.data){
    return response.data;
  }
  return false;
};


export const findConfig = async (code) => {
  const response = await axios.get(`${API_URL}/admins/config/vip/${code}` );
  if (response?.data){
    return response.data;
  }
  return false;
};
export const editConfig = async (payload) => {
  const response = await axios.post(`${API_URL}/admins/config/vip` , payload );
  if (response?.data){
    return response.data;
  }
  return false;
};