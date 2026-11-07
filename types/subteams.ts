export interface SubTeamItem {
  id: string;
  organizationId: string;
  departmentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  membershipRevision: number;
  understaffed: null;
  capacityPercent: number;
  plannedCapacity: number;
  memberCount: number;
}

export interface SubTeamListResponse {
  items: SubTeamItem[];
  total: number;
  page: number;
  limit: number;
}
