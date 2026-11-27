import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetActivityTimeline = (filters: ActivityFilters = {}) => {
  const { organisationId, search, category, from, to } = filters;

  return useQuery<ActivityTimelineResponse>({
    queryKey: ["activity-timeline", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (search) params.append("search", search);
      if (category && category !== "all") params.append("category", category);
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      const response = await api.get(
        `/employer/activities?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!organisationId,
  });
};
