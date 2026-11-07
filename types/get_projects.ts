export type ProjectPriority = "low" | "medium" | "high" | "urgent" | string;
export type ProjectStatus =
  | "todo"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "cancelled"
  | string;

export interface ResourceManager {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  email: string;
}

export interface EntityReference {
  id: string;
  name: string;
}

export interface ProjectItem {
  id: string;
  organizationId: string;
  departmentId: string;
  teamId: string;
  resourceManagerId: string;
  name: string;
  description: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  resourceManager: ResourceManager;
  department: EntityReference;
  team: EntityReference;
}

export interface ProjectListResponse {
  items: ProjectItem[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectProgress {
  totalTasks: number;
  completedTasks: number;
  percent: number;
}

export interface ProjectDetailResponse {
  id: string;
  organizationId: string;
  departmentId: string;
  teamId: string;
  resourceManagerId: string;
  name: string;
  description: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  progress: ProjectProgress;
  resourceManager: ResourceManager;
  department: EntityReference;
  team: EntityReference;
}
