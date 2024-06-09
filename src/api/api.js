import axios from 'axios';
import { Cookies } from 'react-cookie';

export const apiInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

// interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
