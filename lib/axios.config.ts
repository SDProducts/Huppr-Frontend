import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "https://sterling-liard.vercel.app/api/v1/", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});

// Interceptor to attach token if available
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token");
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
    if (status === 401) {
      console.log("Status:", status);
      toast.error("User session timed out");
      Cookies.remove("auth_token");
      Cookies.remove("user_role");
      // logout();
      const router = useRouter();
      router.refresh();
      //   openLogin();
    }

    return Promise.reject(error);
  }
);

export default api;
