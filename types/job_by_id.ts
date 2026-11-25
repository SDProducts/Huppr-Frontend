export type SkillLevel = "beginner" | "working" | "expert" | string;
export type PipelineCategory =
  | "screening"
  | "interview"
  | "assessment"
  | "offer"
  | "hired"
  | string;
export type ChannelType =
  | "careers_page"
  | "global_syndication"
  | "internal_mobility"
  | "premium_boost"
  | string;
export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | string;
export type WorkArrangement = "on_site" | "remote" | "hybrid" | string;

export interface JobSkillDetail {
  id: string;
  name: string;
  level: SkillLevel;
  isRequired: boolean;
  displayOrder: number;
}

export interface JobStageAssessment {
  durationMinutes?: number;
  format?: string;
  pointsTotal?: number;
  passingPercent?: number;
}

export interface JobStageAutomation {
  kind: string;
  label: string;
  isEnabled: boolean;
  config: Record<string, unknown>;
}

export interface JobStageDetail {
  id: string;
  name: string;
  accent: string;
  category: PipelineCategory;
  assessment: JobStageAssessment;
  automations: JobStageAutomation[];
  description: string;
  displayOrder: number;
  isAssessment: boolean;
  candidateCount: number;
  hasEnabledAutomation: boolean;
}

export interface JobBenefitDetail {
  id: string;
  label: string;
  displayOrder: number;
}

export interface JobChannelDetail {
  channel: ChannelType;
  isEnabled: boolean;
}

export interface JobResponsibilityDetail {
  id: string;
  body: string;
  displayOrder: number;
}

export interface PositionSummary {
  openPositions: number;
  totalPositions: number;
  filledPositions: number;
}

export interface HiringTeamMember {
  userId: string;
  roleLabel: string;
  isLead: boolean;
}

export interface ScreeningQuestion {
  prompt: string;
  kind: string;
  threshold: string;
  weight: number;
  isKnockout: boolean;
  isRequired: boolean;
  expectedAnswer: string;
}
export type RoleRequirement = {
  id: string;
  title: string;
  body: string;
  kind: string;
  displayOrder: number;
  category: string;
  isMustHave: boolean;
  note: string;
};

export interface JobDetailResponse {
  id: string;
  title: string;
  skills: JobSkillDetail[];
  stages: JobStageDetail[];
  status: JobStatus;
  roleId: string;
  summary: string;
  teamId: string;
  benefits: JobBenefitDetail[];
  channels: JobChannelDetail[];
  currency: string;
  revision: number;
  closesOn: string;
  positions: number;
  postedOn: string;
  reference: string;
  createdAt: string;
  createdBy: string;
  hiringTeam: HiringTeamMember[];
  salaryMax: number;
  salaryMin: number;
  stageCount: number;
  updatedAt: string;
  publicSlug: string;
  publishedAt: string;
  departmentId: string;
  departmentName: string;
  locationCity: string;
  qualifications: RoleRequirement[];
  employmentType: EmploymentType;
  organizationId: string;
  organizationName: string;
  positionSummary: PositionSummary;
  primaryTooling: string;
  seniorityLevel: string;
  locationCountry: string;
  responsibilities: JobResponsibilityDetail[];
  reviewSlaHours: number;
  workArrangement: WorkArrangement;
  automationPercent: number;
  screeningQuestions: ScreeningQuestion[];
  automatedStageCount: number;
  experienceMinYears: number;
  reportingManagerId: string;
  educationRequirement: string;
}

export interface JobStatsByIdResponse {
  jobId: string;
  status: JobStatus;
  totalPositions: number;
  filledPositions: number;
  openPositions: number;
  totalApplications: number;
  reviewed: number;
  interviewed: number;
  rejected: number;
  offers: number;
  applicationsBySource: [
    {
      source: ChannelType;
      count: number;
      percent: number;
    }
  ];
  byStage: [];
}

export interface Applicants {
  id: string;
  fullName: string;
  email: string;
  source: string;
  matchScore: 94;
  status: string;
  appliedAt: string;
  lastActivityAt: string;
  jobTitle: string;
  stageName: string;
}

export type AutomationConfigValue = string | number | boolean | string[] | null;

export interface AutomationConfigField {
  key: string;
  name: string;
  type: "string" | "integer" | "datetime" | "uuid_array";
  description?: string;
  required: boolean;
  options?: string[];
  default?: AutomationConfigValue;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
}

export interface AutomationCatalogItem {
  id: string;
  kind: string;
  name: string;
  description: string;
  group: string;
  trigger: string;
  status: "ready" | "deferred" | "configuration_only";
  executable: boolean;
  configFields: AutomationConfigField[];
  configExample: Record<string, AutomationConfigValue>;
}

export interface StageAutomation {
  kind: string;
  label: string;
  isEnabled: boolean;
  config: Record<string, AutomationConfigValue>;
}
