import { token } from "@/data/constants";
import api from "@/lib/axios.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
      toast.success("Company data saved");
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
  departments: Suggestion[];
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
