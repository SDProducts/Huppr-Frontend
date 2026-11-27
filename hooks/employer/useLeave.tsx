import api from "@/lib/axios.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetLeavePolicies = () => {
  return useQuery<PaginatedResponse<LeavePolicy>>({
    queryKey: ["leave-policies"],
    queryFn: async () => {
      const response = await api.get(`/employer/leave/policies`);
      return response.data;
    },
    //   enabled: !!organisationId,
  });
};
export const useGetSingleLeavePolicy = (policyId: string) => {
  return useQuery<LeavePolicy>({
    queryKey: ["leave-policy"],
    queryFn: async () => {
      const response = await api.get(`/employer/leave/policies/${policyId}`);
      return response.data;
    },
    enabled: !!policyId,
  });
};

export const useCreateNewLeavePolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: AddNewLeavePolicyPayload
    ): Promise<LeavePolicy> => {
      const response = await api.post(`/employer/leave/policies`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["leave-policies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave-policy"],
      });
      toast.success("Created new leave policy");
    },
    onError: (error: AxiosError<ApiError>) => {
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
export const usePatchLeavePolicy = (policyId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: AddNewLeavePolicyPayload
    ): Promise<LeavePolicy> => {
      const response = await api.patch(
        `/employer/leave/policies/${policyId}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["leave-policies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["leave-policy"],
      });
      toast.success("Leave policy updated");
    },
    onError: (error: AxiosError<ApiError>) => {
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
