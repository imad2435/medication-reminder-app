import api from './axiosConfig.js';

const API_URL = '/medications'; 

export const createMedication = async (medicationData) => {
  const { data } = await api.post(API_URL, medicationData);
  return data;
};

export const getMedications = async () => {
  const { data } = await api.get(API_URL);
  return data;
};

export const getMedicationById = async (id) => {
  const { data } = await api.get(`${API_URL}/${id}`);
  return data;
};

export const updateMedication = async (id, medicationData) => {
  const { data } = await api.put(`${API_URL}/${id}`, medicationData);
  return data;
};

export const deleteMedication = async (id) => {
  const { data } = await api.delete(`${API_URL}/${id}`);
  return data;
};

// --- ADD THIS EXPORTED FUNCTION ---
export const logMedicationStatus = async (id, statusData) => {
  // statusData will be an object like { status: 'Taken' }
  const { data } = await api.post(`${API_URL}/${id}/log`, statusData);
  return data;
};