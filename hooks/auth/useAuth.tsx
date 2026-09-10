import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { useUserState } from "../../zustand/user.state";
import api from "@/lib/axios.config";
// const { setUser, setIsLoggedIn, setToken, reset } = useUserState.getState();
const onboarding_complete = Cookies.get("onboarding_complete");
const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post(`auth/sign-in`, payload);
  return res.data;
};
const register = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
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
  Cookies.set("access_token", "");
  Cookies.set("refresh_token", "");
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
      Cookies.set("access_token", data.session.access_token, {
        expires: data.session.expires_in,
        secure: true,
        // sameSite: "Strict",
      });
      Cookies.set("refresh_token", data.session.refresh_token, {
        expires: data.session.expires_in,
        secure: true,
        // sameSite: "Strict",
      });
      Cookies.set("user_role", data.user.user_metadata.role, {
        expires: data.session.expires_in,
        secure: true,
      });
      if (data.user.user_metadata.email_verified) {
        if (data.user.user_metadata.role === "employer") {
          if (onboarding_complete) {
            toast.success("Login successfully");
            router.push("/dashboard");
          }
          toast.success("Login successfully, let's setup your workspace");
          router.push("/onboarding");
        }
        if (data.user.user_metadata.role === "job_seeker") {
          toast.success("Login successfully");
          router.push("/jobs");
        }
      } else {
        toast.success("Please verify your email");
        router.push("/auth/verify-email");
      }
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
  const router = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success(`Account created Successfully`);
      Cookies.set("user_email", response.user.email, {
        expires: 1,
        secure: true,
      });
      router.push("/auth/confirm-email");
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
interface OTPPayload {
  otp: string;
  email: string;
}
export const useConfirmOTP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: OTPPayload) => {
      const res = await api.post(`/auth/confrim-otp/`, payload);
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

export const useCompleteSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { role: string }) => {
      const response = await api.post("/auth/complete-onboarding", payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Signup Completed");
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
        toast.error("Failed to update user role");
      }
    },
  });
};
export const useGetMyDetails = () => {
  const token = Cookies.get("access_token");
  const response = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/auth/me/");
      return res.data;
    },
    enabled: !!token,
  });
  // useEffect(() => {
  //   if (response.data) {
  //     setUser(response.data);
  //   }
  // }, [response.data]);

  return response;
};
