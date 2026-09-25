export type JobStatus = "draft" | "published" | "archived" | string;
export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | string;
export type WorkArrangement = "on_site" | "remote" | "hybrid" | string;

export interface JobRequirements {
  responsibilities: string[];
  skills: string[];
  minimumDegree: string;
  fieldOfStudy: string;
  minYears: number;
  maxYears: number;
  certifications: string[];
  languages: string[];
  otherRequirements: string;
}

export interface JobBenefits {
  currency: string;
  minimumSalary: number;
  maximumSalary: number;
  leaveTypes: string[];
  salaryReviewFrequency: string;
  probationMonths: number;
  growthReviewFrequency: string;
  successionPath: string;
  reportingLine: string;
  benefits: string[];
}

export interface JobItem {
  id: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  expectedRevision: number;
  name: string;
  departmentId: string;
  status: JobStatus;
  description: string;
  level: string;
  employmentType: EmploymentType;
  location: string;
  workArrangement: WorkArrangement;
  requirements: JobRequirements;
  benefits?: JobBenefits;
  reportsToUserId: string;
  permissionIds: string[];
  revision: number;
  key: string;
  isSystem: boolean;
  metrics: {
    members: [];
    openPositions: number;
    totalPositions: number;
    filledPositions: number;
    plannedPositions: number;
    averageSalaryByCurrency: [];
  };
}

export interface JobListResponse {
  items: JobItem[];
  total: number;
  page: number;
  limit: number;
}
