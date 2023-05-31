import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1'; // replace with your API URL

export const listCustomres = async (filter) => {
  const response = await axios.get(`${API_URL}/users?filter=${filter}`);
  if (response?.data){
    return response.data;
  }
  return false;
};

export const listReservations = async (filter) => {
  const response = await axios.get(`${API_URL}/reservations?filter=${filter}`);
  if (response?.data){
    return response.data;
  }
  return false;
};


export const deleteLead = async (phone) => {
  const response = await axios.delete(`${API_URL}/users/${phone}`);
  if (response?.status == 204){
    return true;
  }
  return false;
};

export const deleteReservation = async (id) => {
  const response = await axios.delete(`${API_URL}/reservations/${id}`);
  if (response?.status == 204){
    return true;
  }
  return false;
};

export const cancelReservation = async (id) => {
  const response = await axios.get(`${API_URL}/reservations/cancel/${id}`);
  if (response?.status == 200){
    return true;
  }
  return false;
};