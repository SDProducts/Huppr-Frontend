export interface SubTeamItem {
  id: string;
  organizationId: string;
  departmentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  membershipRevision: number;
}

export interface SubTeamListResponse {
  items: SubTeamItem[];
  total: number;
  page: number;
  limit: number;
}
