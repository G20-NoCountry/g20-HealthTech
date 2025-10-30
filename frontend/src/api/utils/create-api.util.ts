import axios, { type AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API as string;

export const createApi = (authType: 'user' | 'public'): AxiosInstance => {
  const api = axios.create({ baseURL: BASE_URL });
  if (authType === 'user') api.defaults.withCredentials = true;

  return api;
};
