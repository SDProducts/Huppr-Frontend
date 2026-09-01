import { token } from "@/data/constants";
import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";
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
