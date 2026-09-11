interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fbq: (...args: any[]) => void;
}

interface ModalState {
  isCloseable: boolean;
  isTransModal: boolean;
  isOpen: boolean;
  content: ReactNode | null;
  title: string;
  size: string;
  // setTitle: (title: string) => void;
  goBack: () => void;
  open: (content: StateModalContent) => void;
  openStrong: (content: ReactNode) => void;
  openTransModal: (content: ReactNode) => void;
  close: () => void;
}
interface StateModalContent {
  content: ReactNode;
  title?: string;
  size?: string;
  goBack?: () => void;
}

type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance"
  | "temporary";

type ExperienceLevel =
  | "entry"
  | "junior"
  | "mid"
  | "senior"
  | "lead"
  | "director"
  | "executive";

type WorkMode = "remote" | "onsite" | "hybrid";

type JobStatus = "active" | "inactive" | "draft" | "closed";

//  type Job = {
//   id: string;
//   title: string;
//   company_id: string;

//   // company details
//   company?: {
//     id?: string;
//     name: string;
//     logo?: string;
//   };

//   // location details
//   location?: {
//     city?: string;
//     state?: string;
//     country?: string;
//     postal_code?: string;
//     address?: string;
//   };

//   description: string;
//   // list of key responsibilities
//   responsibilities?: string[];
//   // list of required qualification
//   requirements?: string[];
//   // list of preferred qualification
//   preferred_qualifications?: string[];

//   // list of required and preferred skills
//   skills?: string[];

//   // salary information
//   salary?: {
//     min?: number;
//     max?: number;
//     currency?: string; // e.g NGN, USD, EUR
//   };

//   employment_type: EmploymentType;
//   experience_level: ExperienceLevel;
//   work_mode: WorkMode;

//   // number of positions available
//   openings?: number;

//   posted_date: Date | string;
//   application_deadline?: Date | string;
//   start_date?: Date | string;

//   job_status: JobStatus;

//   // department or team
//   departmant?: string;
//   benefits?: string[];

//   // contact information
//   contact_email?: string;
//   contact_person?: string;
//   contact_number?: string;

//   apply_url?: string;

//   // internal notes for recruiters only not visible to applicant
//   internal_notes?: string;

//   created_date: Date | string;
//   updated_date: Date | string;
// };

type Job = {
  id?: string; //UUID
  title?: string;
  company_id?: string; // UUID REFERENCES public.company(id),
  company_name?: string;
  company_logo?: string;
  company_website?: string;
  location_address?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  description?: string;
  responsibilities: string[];
  requirements: string[]; //
  preferred_qualifications: string[];
  skills: string[]; //  -- required skills
  salary_min: number;
  salary_max: number;
  salary_currency: string;
  salary_period: string;
  employment_type?: string; // -- full-time, part-time, etc.
  experience_level?: string; //-- entry, junior, mid, senior, lead, etc.
  work_mode?: string; //-- remote, onsite, hybrid
  openings: number; // DEFAULT 1,
  application_deadline: Date | string;
  status?: string; // DEFAULT 'active', -- active, closed, draft
  department: string;
  benefits: string[];
  contact_email?: string;
  contact_name?: string;
  contact_number?: string;
  apply_url?: string;
  internal_notes: string;
  created_by: string; // UUID REFERENCES auth.users(id),
  created_at: Date | string; // DEFAULT NOW(),
  updated_at: Date | string; // DEFAULT NOW()
};

type AuthStep = "sign-up" | "verify";

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  email: string;
  password: string;
  role?: string;
}
interface LoginResponse {
  session: Session;
  user: User;
}

interface ErrorMsg {
  message: string;
}
type LoginError = {
  statusCode: string;
  message: string | string[];
  error: string;
  path: string;
  requestId: string;
  timestamp: string;
};
interface ErrorResponse {
  detail: string;
}
type RegisterError = {
  statusCode: string;
  message: string[];
  error: string;
  path: string;
  requestId: string;
  timestamp: string;
};

interface NewPasswordPayload {
  password: string;
}

interface UserMeta {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  role: string;
  sub: string;
}
interface AppMeta {
  provider: string;
  providers: string[];
}
interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    role: string;
    sub: string;
  };
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}
interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  confirmation_sent_at: string;
  app_metadata: AppMeta;
  user_metadata: UserMeta;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}
interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: User;
  weak_password: null;
}
interface RegisterResponse {
  user: User;
  session: Session;
}
interface Company {
  name: string;
  industryId: string;
  industryName: string;
  website: string;
  size: string;
  sizeLabel: string;
  logoUrl: string;
  logoUploadedAt: string;
}
interface SavedDepartment {
  name: string;
  iconId: string;
  clientId: string;
  description: string;
}
interface WorkspaceSettings {
  countryCode: string;
  countryName: string;
  timezone: string;
  locale: string;
  weekStartsOn: string;
  dateFormat: string;
}
interface OnboardingStateResponse {
  status: string;
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  nextAction: string;
  completedSteps: number[];
  company: Company;
  companyRevision: number;
  departments: SavedDepartment[];
  departmentsRevision: number;
  workspaceSettings: WorkspaceSettings;
  settingsRevision: number;
  organizationId: string;
}

interface Option {
  label: string;
  description?: string;
  value: string;
}

interface Industry {
  name: string;
  id: string;
  category;
  active: boolean;
  popular: boolean;
}
interface IndustriesRefResponse {
  items: Industry[];
}

interface ProgressResponse {
  completedStep: number;
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  nextAction: string;
  completedAt: string;
}
interface SelectedDepartment {
  iconId: string;
  name: string;
  description: string;
}

interface Suggestion {
  iconId: string;
  name: string;
  description: string;
  popular: boolean;
}

interface SuggestionsResponse {
  suggestions: Suggestion[];
  defaultSuggestion: Suggestion;
}
interface TimeZone {
  name: string;
  offset: string;
  abbr: string;
  countryCode: string;
}

interface TimeZonesResponse {
  items: TimeZone[];
  total: number;
}
interface Country {
  code: string;
  name: string;
  phoneCode: string;
  currency: string;
  flag: string;
}

interface CountryResponse {
  items: Country[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface Locale {
  code: string;
  name: string;
  language: string;
  countryCode: string;
  countryName: string;
  defaultWeekStart: string;
  defaultDateFormat: string;
}
interface LocaleResponse {
  items: Locale[];
  total: number;
}

interface DepartmentIcons {
  id: string;
  name: string;
  active: boolean;
  builtinKey: null;
  url: string;
}
interface DepartmentIconResponse {
  items: DepartmentIcons[];
}

interface EmployerDashboardResponse {
  organization: Organization;
  timezone: string;
  asOf: string;
  summary: NetworkSummary;
  todaysActivity: TodaysActivity;
  upcomingEvents: UpcomingEvents;
  departmentOverview: DepartmentOverview;
  unavailableMetrics: string[];
}

interface Organization {
  id: string;
  name: string;
}

interface NetworkSummary {
  departments: number;
  headcount: number | null;
  openRoles: number | null;
  onLeaveToday: number | null;
}

interface TodaysActivity {
  items: ActivityItem[];
  nextCursor: string;
}

interface ActivityItem {
  id: string;
  category: string;
  kind: string;
  title: string;
  summary: string;
  occurredAt: string;
  actorId: string;
  subject: ActivitySubject;
  urgency: "low" | "normal" | "high" | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availableActions: any[]; // Replace any[] if you have specific action shapes
}

interface ActivitySubject {
  type: string;
  id: string;
}

interface UpcomingEvents {
  items: EventItem[];
}

interface EventItem {
  id: string;
  organizationId: string;
  kind: string;
  source: "manual" | string;
  sourceId: string | null;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  allDay: boolean;
  location: string;
  meetingUrl: string;
  organizerId: string;
  attendees: Attendee[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface Attendee {
  userId: string;
  response: "accepted" | "declined" | "tentative" | "needs_action" | string;
}

interface DepartmentOverview {
  summary: DepartmentSummary;
  items: DepartmentItem[];
  unavailableMetrics: string[];
}

interface DepartmentSummary {
  totalDepartments: number;
  totalHeadcount: number | null;
  totalSubteams: number | null;
}

interface DepartmentItem {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  displayOrder: number;
  archived: boolean;
  icon: DepartmentIcon;
  createdAt: string;
}

interface DepartmentIcon {
  id: string;
  name: string;
  builtin_key: string;
  storage_path: string | null;
}
