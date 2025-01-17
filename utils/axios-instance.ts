import axios from 'axios';
import { toast } from 'react-toastify';

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
    toast.error(`Request error: ${error.message}`);
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response && (error.response.status >= 400 && error.response.status < 600)) {
      toast.error(`Code ${error.response.status}: ${error.response.data.message || error.message}`);
    } else {
      toast.error(`Unexpected error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
