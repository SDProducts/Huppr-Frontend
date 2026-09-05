import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetIndustries = () => {
  return useQuery<IndustriesRefResponse>({
    queryKey: ["ref-industries"],
    queryFn: async () => {
      const response = await api.get("/reference/industries");
      return response.data;
    },
  });
};
export const useGetDepartments = () => {
  return useQuery<SuggestionsResponse>({
    queryKey: ["ref-departmnts"],
    queryFn: async () => {
      const response = await api.get("/reference/departments/suggestions");
      return response.data;
    },
  });
};
