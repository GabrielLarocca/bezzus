import axios from "axios";
import { getToken } from "./auth";
import Nprogress from "nprogress";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  Nprogress.start();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

api.interceptors.response.use(
  async function (response) {
    Nprogress.done();
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
