import api from "@/lib/axios.config";
import { JobDetailResponse } from "@/types/job_by_id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
    queryKey: ["job-seeker-jobs", filters],
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
export const useGetJobById = (jobId?: string) => {
  return useQuery<JobDetailResponse>({
    queryKey: ["job-seeker-jobs", jobId],
    queryFn: async () => {
      const response = await api.get(`/jobs/${jobId}`);
      return response.data;
    },
    enabled: !!jobId,
  });
};

export const useApplyForJob = (jobId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ApplyForJobPayload) => {
      const response = await api.post(`/jobs/${jobId}/apply`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["job"],
      });
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["candidates"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pipeline"],
      });
      toast.success("You have successfully applied for this job.");
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
