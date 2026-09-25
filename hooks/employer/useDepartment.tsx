import api from "@/lib/axios.config";
import { JobItem, JobListResponse } from "@/types/department_roles";
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

interface CreateNewDepartmentPayload {
  name: string;
  description?: string;
  iconId?: string;
}
export const useCreateNewDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateNewDepartmentPayload) => {
      const response = await api.post(`/organization/departments`, payload);
      return response.data;
    },
    onSuccess: () => {
      // Refetch relevant data if needed
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      toast.success("New department created");
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
        toast.error("Failed to create new department");
      }
    },
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
export const useGetRolesById = (roleID?: string) => {
  return useQuery<JobItem>({
    queryKey: ["role", roleID],
    queryFn: async () => {
      const response = await api.get(`/organization/roles/${roleID}`);
      return response.data;
    },
    enabled: !!roleID,
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

export const useCreateNewRole = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateRolePayload) => {
      const response = await api.post("/organization/roles", payload);
      return response.data;
    },
    onSuccess: (data: JobItem) => {
      qc.invalidateQueries({
        queryKey: ["roles"],
      });
      toast.success("Draft saved");
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
export const usePatchNewRole = (roleId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateRolePayload) => {
      const response = await api.patch(
        `/organization/roles/${roleId}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data: JobItem) => {
      qc.invalidateQueries({
        queryKey: ["roles"],
      });
      toast.success("Draft saved");
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

export const useInvalidateQueries = () => {
  const qc = useQueryClient();
  const clearQuery = (keys: string[]) => {
    qc.invalidateQueries({
      queryKey: keys,
    });
  };
  return clearQuery;
};
