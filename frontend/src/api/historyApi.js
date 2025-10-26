import api from './axiosConfig.js';

export const getHistory = async () => {
    const { data } = await api.get('/history');
    return data;
};