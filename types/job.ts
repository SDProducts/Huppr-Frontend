export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance"
  | "temporary";

export type ExperienceLevel =
  "entry" | "junior" | "mid" | "senior" | "lead" | "director" | "executive";

export type WorkMode = "remote" | "onsite" | "hybrid";

export type JobStatus = "active" | "inactive" | "draft" | "closed";

// export type Job = {
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

export type Job = {
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
