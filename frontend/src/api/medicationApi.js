import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/medications'; 

export const createMedication = async (medicationData) => {
  try {
    const token = localStorage.getItem('authToken'); // ✅ use correct key name
    console.log("🟢 Using token:", token); // debug line

    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }

    const response = await axios.post(API_BASE_URL, medicationData, {
      headers: { Authorization: `Bearer ${token}` }, // ✅ attach token
    });

    return response.data;
  } catch (error) {
    console.error('❌ Error creating medication:', error);
    throw error;
  }
};

export const getMedications = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching medications:', error);
    throw error;
  }
};

export const updateMedication = async (id, medicationData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.put(`${API_BASE_URL}/${id}`, medicationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating medication with ID ${id}:`, error);
    throw error;
  }
};

export const deleteMedication = async (id) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting medication with ID ${id}:`, error);
    throw error;
  }
};
