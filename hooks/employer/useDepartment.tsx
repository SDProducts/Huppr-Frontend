import api from "@/lib/axios.config";
import { JobListResponse } from "@/types/department_roles";
import { SubTeamListResponse } from "@/types/subteams";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGetDepartments = (filters: ActivityFilters = {}) => {
  const { organisationId, search, category, from, to } = filters;

  return useQuery<DepartmentsResponse>({
    queryKey: ["departments", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (search) params.append("search", search);
      if (category && category !== "all") params.append("category", category);
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      const response = await api.get(
        `/organization/departments?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!organisationId,
  });
};
export const useGetDepartmentByID = (id?: string) => {
  return useQuery<DepartmentDetailResponse>({
    queryKey: ["department", id],
    queryFn: async () => {
      const response = await api.get(`/organization/departments/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
export const useGetTeams = (filters: TeamsFilters = {}) => {
  const { organisationId, teamId, departmentId, search, page, limit } = filters;

  return useQuery<SubTeamListResponse>({
    queryKey: ["teams", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (departmentId) params.append("departmentId", departmentId);
      if (teamId) params.append("teamId", teamId);
      if (page) params.append("page", page.toString());
      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(
        `/organization/teams?${params.toString()}`
      );
      return response.data;
    },
    // enabled: !!organisationId,
  });
};
export const useGetRoles = (filters: TeamsFilters = {}) => {
  const { organisationId, teamId, departmentId, search, page, limit } = filters;

  return useQuery<JobListResponse>({
    queryKey: ["roles", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (organisationId) params.append("organizationId", organisationId);
      if (departmentId) params.append("departmentId", departmentId);
      if (teamId) params.append("teamId", teamId);
      if (page) params.append("page", page.toString());
      if (search) params.append("search", search);
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(
        `/organization/roles?${params.toString()}`
      );
      return response.data;
    },
    // enabled: !!organisationId,
  });
};

interface CreateSubTeamPayload {
  expectedRevision: number;
  departmentId: string;
  name: string;
  description: string;
  memberIds: string[];
}

export const useCreateSubteam = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateSubTeamPayload) => {
      const response = await api.post("/organization/teams", payload);
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["teams"],
      });
      toast.success("Created new subteam");
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
