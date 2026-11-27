import api from "@/lib/axios.config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetDashboard = (organisationId?: string) => {
  return useQuery<EmployerDashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get(
        `/employer/dashboard?organizationId=${organisationId}`
      );
      return response.data;
    },
    enabled: !!organisationId,
  });
};

export const useAddNewEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AddNewEmployeePayload) => {
      toast.loading("Saving employee...", { id: "loading" });

      const response = await api.post(`/employer/hr/employees`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      toast.success("Add new employee");
    },
    onError: (error: AxiosError<ApiError>) => {
      // Check if this is an Axios error with response data
      console.log(error);
      toast.dismiss("loading");

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
        toast.error("Failed to add new employee");
      }
    },
  });
};
