import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetJobs = (filters: JobsFilters = {}) => {
  const {
    organisationId,
    status,
    departmentId,
    search,
    page,
    limit,
    offset,
    employmentType,
    experienceLevel,
    workArrangement,
    seniorityLevel,
  } = filters;

  return useQuery<PaginatedResponse<Job>>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (departmentId) params.append("departmentId", departmentId);
      if (employmentType) params.append("employmentType", employmentType);
      if (experienceLevel) params.append("experienceLevel", experienceLevel);
      if (seniorityLevel) params.append("seniorityLevel", seniorityLevel);
      if (workArrangement) params.append("workArrangement", workArrangement);
      if (status && status !== "all") params.append("status", status);
      if (page) params.append("page", page.toString());
      if (offset) params.append("offset", offset.toString());
      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(`/jobs?${params.toString()}`);
      return response.data;
    },
    // enabled: !!organisationId,
  });
};
