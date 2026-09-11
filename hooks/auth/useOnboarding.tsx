import { token } from "@/data/constants";
import api from "@/lib/axios.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const useGetOnboarding = () => {
  return useQuery<OnboardingStateResponse>({
    queryKey: ["onboarding"],
    queryFn: async () => {
      const response = await api.get("/employer/onboarding");
      return response.data;
    },
    enabled: !!token,
  });
};
interface Payload {
  expectedRevision: number;
  name: string;
  industryId: string;
  website: string;
  size: string;
}

export const useStartOnboarding = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await api.post("/employer/onboarding/start");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
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
export const useSaveCompanyData = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Payload) => {
      const response = await api.patch("/employer/onboarding/company", payload);
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      toast.success("Draft saved");
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

export const useCompleteCompanyStep = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (): Promise<ProgressResponse> => {
      const response = await api.post("/employer/onboarding/company/complete");
      return response.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      router.push(`/onboarding/${data.nextAction}`);
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
interface DepartmentsSelectPayload {
  expectedRevision: number;
  departments: SelectedDepartment[];
}
export const useSaveSelectedDepartments = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DepartmentsSelectPayload) => {
      const response = await api.put(
        "/employer/onboarding/departments",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      toast.success("Draft Saved");
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
        toast.error("Failed");
      }
    },
  });
};
export const useCompleteDepartmentStep = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (): Promise<ProgressResponse> => {
      const response = await api.post(
        "/employer/onboarding/departments/complete"
      );
      return response.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      router.push(`/onboarding/${data.nextAction}`);
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
        toast.error("Failed");
      }
    },
  });
};

interface WorkspaceSettingsPayload {
  expectedRevision: number;
  countryCode: string;
  timezone: string;
  locale: string;
  weekStartsOn: string;
  dateFormat: string;
}
export const useWorkspaceSettings = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: WorkspaceSettingsPayload) => {
      const response = await api.patch(
        "/employer/onboarding/workspace-settings",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      toast.success("Draft Saved");
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
        toast.error("Failed");
      }
    },
  });
};

export const useCompleteWorkspaceSettings = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (): Promise<ProgressResponse> => {
      const response = await api.post(
        "/employer/onboarding/workspace-settings/complete"
      );
      return response.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      router.push(`/onboarding/${data.nextAction}`);
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
        toast.error("Failed");
      }
    },
  });
};

export const useCompleteOnboarding = () => {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (): Promise<ProgressResponse> => {
      const response = await api.post("/employer/onboarding/complete");
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["onboarding"],
      });
      Cookies.set("onboarding_complete", "true");
      router.push(`/onboading/complete}`);
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
        toast.error("Failed");
      }
    },
  });
};
