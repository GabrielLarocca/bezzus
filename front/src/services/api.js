import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async function (response) {
    if (response.data && response.data.login) {
      window.location.href = "/login";
    } else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
