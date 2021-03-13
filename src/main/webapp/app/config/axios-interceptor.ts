import axios from 'axios';
import { getBasePath, Storage } from 'react-jhipster';

import { SERVER_API_URL, AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'app/config/constants';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

function setupAxiosInterceptors(onUnauthenticated: () => void) {
  const onRequestSuccess = config => {
    const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = async err => {
    const status = err.status || (err.response ? err.response.status : 0);
    const token = Storage.local.get(AUTH_TOKEN_KEY) || Storage.session.get(AUTH_TOKEN_KEY);
    const refreshToken = Storage.local.get(REFRESH_TOKEN_KEY) || Storage.session.get(REFRESH_TOKEN_KEY);
    if (status === 401 && token && refreshToken) {
      const response = await axios.post('/api/authenticate/refresh', { refreshToken });
      const { newJwtToken, newRefreshToken } = response.data;
      Storage.local.set(AUTH_TOKEN_KEY, newJwtToken);
      Storage.local.set(REFRESH_TOKEN_KEY, newRefreshToken);
      return err;
    } else if (status === 401) {
      onUnauthenticated();
      return Promise.reject(err);
    }
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
}

export default setupAxiosInterceptors;
