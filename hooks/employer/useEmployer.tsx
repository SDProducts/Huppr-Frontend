import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

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
