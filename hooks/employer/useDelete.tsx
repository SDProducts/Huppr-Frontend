import api from "@/lib/axios.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useDelete = (queries: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: DeletePayload) => {
      const res = await api.delete(`/${payload.api_path}`);
      return res.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queries.forEach((query) => {
        queryClient.invalidateQueries({
          queryKey: [query],
        });
      });
      toast.success("Deleted successfully");
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
