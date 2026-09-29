import { initialvalues } from "@/data/constants";
import api from "@/lib/axios.config";
import { JobItem, JobListResponse } from "@/types/department_roles";
import {
  ProjectDetailResponse,
  ProjectListResponse,
} from "@/types/get_projects";
import { SubTeamDetailResponse } from "@/types/subteam_by_id";
import { SubTeamListResponse } from "@/types/subteams";
import {
  TaskActivityListResponse,
  TaskItem,
  TaskListResponse,
  TaskNoteListResponse,
} from "@/types/task_types";
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

export const useGetTeamById = (teamId?: string) => {
  return useQuery<SubTeamDetailResponse>({
    queryKey: ["teams", teamId],
    queryFn: async () => {
      const response = await api.get(`/organization/teams/${teamId}`);
      return response.data;
    },
    enabled: !!teamId,
  });
};

export const useCreateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: typeof initialvalues.createProjectPayload) => {
      const response = await api.post("/organization/projects", payload);
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["departments"],
      });
      qc.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("New project created");
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
export const useEditProject = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: typeof initialvalues.createProjectPayload) => {
      const response = await api.patch(
        `/organization/projects/${projectId}`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["departments"],
      });
      qc.invalidateQueries({
        queryKey: ["project"],
      });
      qc.invalidateQueries({
        queryKey: ["projects"],
      });
      toast.success("Saved changes.");
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
interface ProjectFilterParams {
  teamId?: string;
}
export const useGetProjects = (params?: ProjectFilterParams) => {
  return useQuery<ProjectListResponse>({
    queryKey: ["projects", params],
    queryFn: async () => {
      const searchparams = new URLSearchParams();
      if (params?.teamId) {
        searchparams.append("teamId", params.teamId);
      }
      const response = await api.get(
        `/organization/projects?${searchparams.toString()}`
      );
      return response.data;
    },
  });
};

export const useGetTeamMembers = (teamId?: string) => {
  return useQuery<SubTeamDetailResponse>({
    queryKey: ["team-members", teamId],
    queryFn: async () => {
      const response = await api.get(`/organization/teams/${teamId}/members`);
      return response.data;
    },
    enabled: !!teamId,
  });
};
export const useGetProjectById = (projectId?: string) => {
  return useQuery<ProjectDetailResponse>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await api.get(`/organization/projects/${projectId}`);
      return response.data;
    },
    enabled: !!projectId,
  });
};

export const useCreateTask = (projectId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: typeof initialvalues.createTask) => {
      const response = await api.post(
        `/organization/projects/${projectId}/tasks`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tasks"],
      });
      qc.invalidateQueries({
        queryKey: ["projects"],
      });
      qc.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("New task created");
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

interface TaskListFilterParams {
  projectId?: string;
  teamId?: string;
  page?: number;
  limit?: number;
}

export const useGetTasks = (filterParams: TaskListFilterParams = {}) => {
  const { teamId, projectId, page, limit } = filterParams;
  return useQuery<TaskListResponse>({
    queryKey: ["tasks", filterParams],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (projectId) {
        params.append("projectId", projectId);
      }
      if (teamId) {
        params.append("teamId", teamId);
      }
      if (page) {
        params.append("page", String(page));
      }
      if (limit) {
        params.append("limit", String(limit));
      }
      const response = await api.get(
        `/organization/tasks?${params.toString()}`
      );
      return response.data;
    },
  });
};
export const useGetTaskById = (taskId?: string) => {
  return useQuery<TaskItem>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await api.get(`/organization/tasks/${taskId}`);
      return response.data;
    },
    enabled: !!taskId,
  });
};

export const useAddNoteToTask = (taskId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: typeof initialvalues.addTaskNote) => {
      const response = await api.post(
        `/organization/tasks/${taskId}/notes`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["tasks"],
      });
      qc.invalidateQueries({
        queryKey: ["task"],
      });
      qc.invalidateQueries({
        queryKey: ["notes"],
      });
      qc.invalidateQueries({
        queryKey: ["project"],
      });
      toast.success("Added new note");
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

export const useGetTaskNotes = (taskId: string) => {
  return useQuery<TaskNoteListResponse>({
    queryKey: ["notes", taskId],
    queryFn: async () => {
      const response = await api.get(`/organization/tasks/${taskId}/notes`);
      return response.data;
    },
    enabled: !!taskId,
  });
};
export const useGetTaskHistory = (taskId: string) => {
  return useQuery<TaskActivityListResponse>({
    queryKey: ["task-activity-history", taskId],
    queryFn: async () => {
      const response = await api.get(`/organization/tasks/${taskId}/history`);
      return response.data;
    },
    enabled: !!taskId,
  });
};
