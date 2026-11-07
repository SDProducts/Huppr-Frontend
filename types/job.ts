export type ApplicationSource =
  | "careers_page"
  | "linkedin"
  | "referral"
  | "indeed"
  | "agency"
  | string;

export type PipelineStageKey =
  | "screening"
  | "interview"
  | "assessment"
  | "offer"
  | "hired"
  | "rejected"
  | string;

export type ActivityKind =
  | "candidate_added"
  | "stage_changed"
  | "interview_scheduled"
  | "offer_extended"
  | "job_posted"
  | string;

export interface JobsMetricSummary {
  openJobs: number;
  openJobsChange: number;
  draftJobs: number;
  onHoldJobs: number;
  closedJobs: number;
  totalApplications: number;
  applicationsLast7Days: number;
  applicationsChangePercent: number;
  candidatesInReview: number;
  offersExtended: number;
  hiredTotal: number;
  rejectedTotal: number;
  interviewsToday: number;
  interviewsThisWeek: number;
  interviewsOverdue: number;
}

export interface ApplicationSourceMetric {
  source: ApplicationSource;
  count: number;
  percent: number;
}

export interface PipelineStageMetric {
  key: PipelineStageKey;
  count: number;
}

export interface InterviewMetrics {
  today: number;
  thisWeek: number;
  overdue: number;
}

export interface RecruitmentActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  summary: string;
  occurredAt: string;
}

export interface JobsDashboardResponse {
  date: string;
  timezone: string;
  summary: JobsMetricSummary;
  applicationsBySource: ApplicationSourceMetric[];
  pipeline: PipelineStageMetric[];
  interviews: InterviewMetrics;
  recentActivity: RecruitmentActivityItem[];
}

export interface JobListItem {
  id: string;
  title: string;
  status: JobStatus;
  reference: string;
  locationCity: string;
  positions: number;
  applicationCount: number;
  newApplicationCount: number;
  hiredCount: number;
  stageCount: number;
  postedOn: string;
}

// Reusable alias for your specific endpoint response
export type JobListResponse = PaginatedResponse<JobListItem>;
