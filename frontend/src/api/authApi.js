import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/auth'; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data?.message || error.message);
    throw error; 
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // This should contain the token and user info
  } catch (error) {
    console.error('Error logging in:', error.response?.data?.message || error.message);
    throw error;
  }
};

// Function to store the token in local storage
export const storeAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Function to get the token from local storage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// (logout)
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};