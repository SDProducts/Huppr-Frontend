import api from "@/lib/axios.config";
import { CreateJobPayload } from "@/types/create_job_payload";
import { JobListResponse, JobsDashboardResponse } from "@/types/job";
import {
  Applicants,
  JobDetailResponse,
  JobStatsByIdResponse,
} from "@/types/job_by_id";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const response = await api.post(`/employer/jobs`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      toast.success("New job created");
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
export const usePatchJob = (jobId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const response = await api.patch(`/employer/jobs/${jobId}`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["job"],
      });
      toast.success("Updated job successfully");
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
export const usePublishJob = (jobId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async (): Promise<JobDetailResponse> => {
      const response = await api.post(`/employer/jobs/${jobId}/publish`);
      return response.data;
    },
    onSuccess: (data) => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
      queryClient.invalidateQueries({
        queryKey: ["job"],
      });
      toast.success("Published job successfully");
      router.push(`/dashboard/jobs/${data.id}`);
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

export const useGetJobOverviewMetrics = (filters: TeamsFilters = {}) => {
  const { organisationId, teamId, departmentId, search, page, limit } = filters;

  return useQuery<JobsDashboardResponse>({
    queryKey: ["jobdashboard-metrics", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (departmentId) params.append("departmentId", departmentId);
      if (teamId) params.append("teamId", teamId);
      if (page) params.append("page", page.toString());
      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(
        `/employer/jobs/metrics?${params.toString()}`
      );
      return response.data;
    },
    // enabled: !!organisationId,
  });
};
export const useGetJobs = (filters: JobsFilters = {}) => {
  const { organisationId, status, departmentId, search, page, limit } = filters;

  return useQuery<JobListResponse>({
    queryKey: ["jobs", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (departmentId) params.append("departmentId", departmentId);
      if (status && status !== "all") params.append("status", status);
      if (page) params.append("page", page.toString());
      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(`/employer/jobs?${params.toString()}`);
      return response.data;
    },
    // enabled: !!organisationId,
  });
};

export const useGetJobById = (jobId?: string) => {
  return useQuery<JobDetailResponse>({
    queryKey: ["job", jobId],
    queryFn: async () => {
      const response = await api.get(`/employer/jobs/${jobId}`);
      return response.data;
    },
    enabled: !!jobId,
  });
};
export const useGetJobStatsById = (jobId?: string) => {
  return useQuery<JobStatsByIdResponse>({
    queryKey: ["job-stats", jobId],
    queryFn: async () => {
      const response = await api.get(`/employer/jobs/${jobId}/stats`);
      return response.data;
    },
    enabled: !!jobId,
  });
};
export const useGetJobApplicants = (jobId?: string) => {
  return useQuery<PaginatedResponse<Applicants>>({
    queryKey: ["job-applicants", jobId],
    queryFn: async () => {
      const response = await api.get(`/employer/jobs/${jobId}/candidates`);
      return response.data;
    },
    enabled: !!jobId,
  });
};
