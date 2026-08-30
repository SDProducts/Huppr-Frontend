import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useUserState } from "../../zustand/user.state";
import api from "@/lib/axios.config";
// const { setUser, setIsLoggedIn, setToken, reset } = useUserState.getState();

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post(`auth/sign-in`, payload);
  return res.data;
};
const register = async (payload: RegisterPayload): Promise<LoginResponse> => {
  const res = await api.post(`/auth/sign-up/`, payload);
  return res.data;
};
const forgotPassword = async (payload: {
  email: string;
}): Promise<LoginResponse> => {
  const res = await api.post(`/auth/forgot-password/`, payload);
  return res.data;
};
export const logout = async () => {
  //   reset(); // Reset user store
  Cookies.set("auth_token", "");
  Cookies.set("user_role", "");
  localStorage.removeItem("user-state"); // Clear persisted user state
  // window.location.reload(); // Optional: Refresh page to clear UI state
  toast.success("Logged out successfully!"); // Show logout success message
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      //   setToken(data.token);
      Cookies.set("auth_token", data.token, {
        expires: 1,
        secure: true,
        // sameSite: "Strict",
      });
      Cookies.set("user_role", data.user.role, {
        expires: 1,
        secure: true,
        // sameSite: "Strict",
      });
      //   setUser(data.user);
      //   setIsLoggedIn(true);
      toast.success("Login successfully");
      router.refresh();
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      console.log(error);
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message) {
          const messages = errorData.message;
          if (typeof messages === "string") {
            toast.error(messages);
          } else {
            for (let index = 0; index < messages.length; index++) {
              const errorMsg = messages[index];
              toast.error(errorMsg);
            }
          }
        }
      } else {
        toast.error("Login Failed");
      }
    },
  });
};
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success(`Logged in Successfully... ${response.user.first_name}`);
      //   setUser(response.user);
      //   setIsLoggedIn(true);
      //   setToken(response.token);
      Cookies.set("auth_token", response.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user_role", response.user.role, {
        expires: 7,
        secure: true,
      });
    },
    onError: (error: AxiosError<LoginError>) => {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message) {
          const messages = errorData.message;
          if (typeof messages === "string") {
            toast.error(messages);
          } else {
            for (let index = 0; index < messages.length; index++) {
              const errorMsg = messages[index];
              toast.error(errorMsg);
            }
          }
        }
      } else {
        toast.error("Registeration Failed");
      }
    },
  });
};
export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("OTP sent successfully");
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      console.log(error);
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message) {
          const messages = errorData.message;
          if (typeof messages === "string") {
            toast.error(messages);
          } else {
            for (let index = 0; index < messages.length; index++) {
              const errorMsg = messages[index];
              toast.error(errorMsg);
            }
          }
        }
      } else {
        toast.error("OTP Failed");
      }
    },
  });
};
export const useResendOTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      const payload = { email: email };
      const res = await api.post(`/auth/resend-confirmation/`, payload);
      return res.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("OTP sent successfully");
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      console.log(error);
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message) {
          const messages = errorData.message;
          if (typeof messages === "string") {
            toast.error(messages);
          } else {
            for (let index = 0; index < messages.length; index++) {
              const errorMsg = messages[index];
              toast.error(errorMsg);
            }
          }
        }
      } else {
        toast.error("OTP Failed");
      }
    },
  });
};
export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: NewPasswordPayload) => {
      const res = await api.post(`/auth/update-password/`, payload);
      return res.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError<LoginError>) => {
      // Check if this is an Axios error with response data
      console.log(error);
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.message) {
          const messages = errorData.message;
          if (typeof messages === "string") {
            toast.error(messages);
          } else {
            for (let index = 0; index < messages.length; index++) {
              const errorMsg = messages[index];
              toast.error(errorMsg);
            }
          }
        }
      } else {
        toast.error("Failed to change passowrd");
      }
    },
  });
};

// export const useGetUser = () => {
//   const token = Cookies.get("auth_token");
//   const response = useQuery<User>({
//     queryKey: ["user-profile"],
//     queryFn: async () => {
//       const res = await api.get("/user/profile/");
//       return res.data;
//     },
//     enabled: !!token,
//   });
//   useEffect(() => {
//     if (response.data) {
//       setUser(response.data);
//     }
//   }, [response.data]);

//   return response;
// };
