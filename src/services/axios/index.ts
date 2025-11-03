import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }

    return config;
  },
  (error: Error): Promise<Error> => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<never> => {
    const status = error.response?.status;

    if (window.location.pathname === '/login') return Promise.reject(error);

    if (status === 401) {
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(error);
    }


    return Promise.reject(error);
  },
);
