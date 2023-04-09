import axios, { AxiosRequestConfig } from 'axios';
import authService from '../feature/auth/authService';

const useAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000, // set timeout for all requests
  withCredentials: true,
});

useAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const condition =
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/activate');

    if (condition) return config;

    const token = JSON.parse(localStorage.getItem('token') as string);
    if (!token) return config;
    // Handle Logout

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any;

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

useAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log(err);
    const prevRequest = err?.response;
    // handle with status code === 403, accessToken expires => refresh token;
    if (err?.response.status === 403) {
      const newAccessToken = await authService.refreshToken();
      prevRequest.headers = {
        ...prevRequest.headers,
        Authorization: `Bear ${newAccessToken}`,
      };
      // Request again
      return useAxios(prevRequest);
    }
    return Promise.reject(err);
  }
);

export default useAxios;
