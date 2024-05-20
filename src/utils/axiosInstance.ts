import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://api.homologation.cliqdrive.com.br',
  headers: {
    Accept: 'application/json;version=v1_web',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      const navigate = useNavigate();
      navigate('/');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
