import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetLeave = () => {
  return useQuery<LoginResponse>({
    queryKey: ["leave"],
    queryFn: async () => {
      const response = await api.get(`/employer/hr/leave`);
      return response.data;
    },
    //   enabled: !!taskId,
  });
};
