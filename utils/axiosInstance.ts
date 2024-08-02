import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any request config modifications here if needed
    return config;
  },
  (error) => {
    // Handle request error
    alert(`Request error: ${error.message}`);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    console.log(error);
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    alert(`Response error: ${error.message}`);
    return Promise.reject(error);
  }
);

export default axiosInstance;
