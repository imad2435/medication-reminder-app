import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

// Request interceptor to add the token
api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      // Access token correctly based on backend login response structure
      if (userInfo && userInfo.data && userInfo.data.token) {
        config.headers.Authorization = `Bearer ${userInfo.data.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401 Unauthorized error, the token is bad. Log the user out.
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userInfo');
      // Redirect to login, forcing a state refresh
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;