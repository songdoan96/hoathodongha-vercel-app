import axios from "axios";
import configuration from "./configuration";
import routers from "./routers";
const API_BASE_URL = configuration().BACKEND_URL;

export interface ApiError {
  message: string;
  status?: number;
}

export class ApiClientError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    const status = error.response?.status;

    if (status === 401 && location.pathname !== routers().auth.login) {
      window.location.href = routers().auth.login + "?from=" + location.pathname;
    }

    // return Promise.reject(error);
    throw new ApiClientError(message, status);
  }
);

// export async function apiClient<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
//   const response = await axiosInstance(endpoint, options);
//   return response.data;
// }
export default apiClient;
