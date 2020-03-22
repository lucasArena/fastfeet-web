import axios from 'axios';
import { store } from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(config => {
  api.defaults.headers.Authorization = `Bearer ${store.getState().auth.token}`;
  return config;
});

api.interceptors.response.use(config => {
  const { data } = config;
  return data;
});

export default api;
