import api from './axiosConfig.js';

export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const loginUser = async (credentials) => {
  // This function ONLY makes the API call. It does not touch local storage.
  const { data } = await api.post('/auth/login', credentials);
  return data; 
};

export const logoutUser = () => {
  // This function ONLY removes the item from local storage.
  localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
  const userInfoString = localStorage.getItem('userInfo');
  return userInfoString ? JSON.parse(userInfoString) : null;
};