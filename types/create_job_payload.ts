export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | string;
export type WorkArrangement = "on_site" | "remote" | "hybrid" | string;
export type SkillLevel =
  | "beginner"
  | "working"
  | "expert"
  | "Proficient"
  | string;
export type QualificationKind = "must_have" | "nice_to_have" | string;
export type ScreeningQuestionKind =
  | "short_answer"
  | "long_answer"
  | "multiple_choice"
  | "boolean"
  | string;
export type PipelineStageCategory =
  | "screening"
  | "interview"
  | "assessment"
  | "offer"
  | string;
export type AutomationKind = "email" | "webhook" | "notification" | string;
export type ChannelType = "careers_page" | "linkedin" | "internal" | string;

export interface JobResponsibility {
  body: string;
}

export interface JobQualification {
  kind: QualificationKind;
  body: string;
}

export interface JobSkill {
  name: string;
  level: SkillLevel;
  isRequired: boolean;
}

export interface JobScreeningQuestion {
  prompt: string;
  kind: ScreeningQuestionKind;
  threshold: string;
  weight: number;
  isKnockout: boolean;
  isRequired: boolean;
  expectedAnswer: string;
}

export interface StageAssessment {
  durationMinutes: number;
  format: string;
  pointsTotal: number;
  passingPercent: number;
}

export interface StageAutomation {
  kind: AutomationKind;
  label: string;
  isEnabled: boolean;
  config: Record<string, unknown>;
}

export interface JobStage {
  name: string;
  category: PipelineStageCategory;
  description: string;
  accent: string;
  isAssessment: boolean;
  assessment?: StageAssessment;
  automations: StageAutomation[];
}

export interface JobChannel {
  channel: ChannelType;
  isEnabled: boolean;
}

export interface JobBenefit {
  label: string;
}

export interface HiringTeamMember {
  userId: string;
  roleLabel: string;
  isLead: boolean;
}

export interface CreateJobPayload {
  title?: string;
  roleId?: string;
  departmentId?: string;
  teamId?: string;
  reportingManagerId?: string;
  reference?: string;
  summary?: string;
  employmentType?: EmploymentType;
  workArrangement?: WorkArrangement;
  seniorityLevel?: string;
  experienceMinYears?: number;
  educationRequirement?: string;
  primaryTooling?: string;
  reviewSlaHours?: number;
  locationCountry?: string;
  locationCity?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  positions?: number;
  postedOn?: string;
  closesOn?: string;
  responsibilities?: JobResponsibility[];
  qualifications?: JobQualification[];
  skills?: JobSkill[];
  screeningQuestions?: JobScreeningQuestion[];
  stages?: JobStage[];
  channels?: JobChannel[];
  benefits?: JobBenefit[];
  hiringTeam?: HiringTeamMember[];
  expectedRevision?: number;
}
