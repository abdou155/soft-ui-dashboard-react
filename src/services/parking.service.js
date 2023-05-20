import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // replace with your API URL

// function to get all parkings
export const getAllParkings = async () => {
  const response = await axios.get(`${API_URL}/parkings`);
  if (response?.data){
    return response.data;
  }
  return false;
};

// function to create a new parking
export const createParking = async (parkingData) => {
  const response = await axios.post(`${API_URL}/parkings`, parkingData);
  return response.data;
};

// function to update an existing parking
export const updateParking = async (parkingId, parkingData) => {
  const response = await axios.put(`${API_URL}/parkings/${parkingId}`, parkingData);
  return response.data;
};

// function to delete an existing parking
export const deleteParking = async (parkingId) => {
  const response = await axios.delete(`${API_URL}/parkings/${parkingId}`);
  return response.data;
};
