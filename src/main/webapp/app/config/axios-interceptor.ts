import axios, { AxiosRequestConfig } from 'axios';
import { getBasePath, Storage } from 'react-jhipster';

import { SERVER_API_URL, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'app/config/constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

function setupAxiosInterceptors(onUnauthenticated: () => Promise<void>) {
  const onRequestSuccess = (config: AxiosRequestConfig) => {
    const token = Storage.local.get(ACCESS_TOKEN_KEY) || Storage.session.get(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = async (err: any) => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 401) {
      await onUnauthenticated();
      return;
    }
    throw err;
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

export default setupAxiosInterceptors;
