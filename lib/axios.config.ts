import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "https://sterling-liard.vercel.app/api/v1/"; // Replace with your actual API URL
const api = axios.create({
  baseURL: baseURL, // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

// Interceptor to attach token if available
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // Example: Auto logout on 401
    // if (status === 401) {
    //   console.log("Status:", status);
    //   toast.error("User session timed out");
    //   Cookies.remove("access_token");
    //   Cookies.remove("user_role");
    //   // logout();
    //   const router = useRouter();
    //   router.refresh();
    //   //   openLogin();
    // }

    return Promise.reject(error);
  }
);

export default api;
