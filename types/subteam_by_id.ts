export interface SubteamUserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
}

export interface EntityReference {
  id: string;
  name: string;
}

export interface SubEmployee {
  id: string;
  userId: string;
  departmentId: string;
  roleId: string;
  displayName: string;
  avatarUrl: string | null;
  departmentName: string;
  roleName: string;
  user: SubteamUserProfile;
  department: EntityReference;
  role: EntityReference;
}

export interface SubTeamMetrics {
  id: string;
  departmentId: string;
  headcount: number;
  plannedCapacity: number;
  capacityPercent: number;
  understaffed: boolean;
  iconId: string;
}

export interface SubTeamDetailResponse {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  expectedRevision: number;
  departmentId: string;
  name: string;
  description: string;
  memberIds: string[];
  metrics: SubTeamMetrics;
  memberCount: number;
  plannedCapacity: number;
  capacityPercent: number;
  understaffed: boolean;
  iconId: string;
  membershipRevision: number;

  // People & Roles
  approver: SubteamUserProfile;
  user: SubteamUserProfile;
  employee: SubEmployee;
  buddy: SubteamUserProfile;
  reviewer: SubteamUserProfile;
  lead?: SubteamUserProfile;
  reportsTo: SubteamUserProfile;
  resourceManager: SubteamUserProfile;
  assignee: SubteamUserProfile;
  organizer: SubteamUserProfile;
  actor: SubteamUserProfile;
  creator: SubteamUserProfile;
  author: SubteamUserProfile;
  decisionMaker: SubteamUserProfile;
  finalizer: SubteamUserProfile;
  approvers: SubteamUserProfile[];

  // Entity References
  department: EntityReference;
  role: EntityReference;
  team: EntityReference;
  project: EntityReference;
}
