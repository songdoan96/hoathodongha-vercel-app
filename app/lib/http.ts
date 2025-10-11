import axios from "axios";
import useAuthStore from "~/stores/auth-store";
import ENV_CONFIG from "./env";
import routers from "./router";
import configuration from "./configuration";
const apiClient = axios.create({
  baseURL: ENV_CONFIG.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // useAuthStore.getState().logout();
      const originalUrl = window.location.pathname + window.location.search;
      window.location.href = window.location.search.includes("redirectTo")
        ? routers.auth.login
        : routers.auth.login + "?redirectTo=" + originalUrl;
    }
    return Promise.reject(error.response.data);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(configuration().TOKEN_KEY) || useAuthStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
