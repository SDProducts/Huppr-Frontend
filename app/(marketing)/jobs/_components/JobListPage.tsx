// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { cn, getInitials } from "@/lib/utils";
// import {
//   Bookmark,
//   BriefcaseBusiness,
//   Clock3,
//   DollarSign,
//   MapPin,
//   Plane,
//   Share2,
//   ShieldCheck,
//   Sparkles,
//   WalletCards,
// } from "lucide-react";
// import * as React from "react";

// /* -------------------------------------------------------------------------- */
// /*                                   TYPES                                    */
// /* -------------------------------------------------------------------------- */

// /* -------------------------------------------------------------------------- */
// /*                              FILTER SIDEBAR                                */
// /* -------------------------------------------------------------------------- */

// function FilterSidebar() {
//   return (
//     <aside className="w-[255px] shrink-0 text-[13px] text-slate-500">
//       <div className="mb-7 flex items-center justify-between">
//         <h2 className="font-semibold text-slate-500">Filters</h2>

//         <button className="text-[12px] font-semibold text-blue-600 hover:text-blue-700">
//           Clear Filters
//         </button>
//       </div>

//       {/* Employment */}
//       <FilterSection title="Employment Type">
//         {["Full-time", "Contract", "Part-time", "Internship"].map((item) => (
//           <CheckboxRow key={item} label={item} />
//         ))}
//       </FilterSection>

//       {/* Experience */}
//       <FilterSection title="Experience Level">
//         <CheckboxRow label="Entry Level" />
//         <CheckboxRow label="Intermediate" />
//         <CheckboxRow label="Senior" checked />
//       </FilterSection>

//       {/* Salary */}
//       <FilterSection title="Salary Range">
//         <div className="px-2 pt-3">
//           <Slider
//             defaultValue={[40, 200]}
//             min={40}
//             max={200}
//             step={5}
//             className="mb-3"
//           />

//           <div className="flex justify-between text-[11px]">
//             <span>$40k</span>
//             <span>$200k+</span>
//           </div>
//         </div>
//       </FilterSection>

//       {/* Industry */}
//       <FilterSection title="Industry">
//         <Select defaultValue="all">
//           <SelectTrigger className="h-9 w-full border-slate-200 bg-white text-xs text-slate-600">
//             <SelectValue />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="all">All Industries</SelectItem>
//             <SelectItem value="technology">Technology</SelectItem>
//             <SelectItem value="finance">Finance</SelectItem>
//             <SelectItem value="marketing">Marketing</SelectItem>
//             <SelectItem value="healthcare">Healthcare</SelectItem>
//           </SelectContent>
//         </Select>
//       </FilterSection>
//     </aside>
//   );
// }

// function FilterSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="mb-9">
//       <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.03em] text-slate-500">
//         {title}
//       </h3>

//       <div className="space-y-3">{children}</div>
//     </section>
//   );
// }

// function CheckboxRow({
//   label,
//   checked = false,
// }: {
//   label: string;
//   checked?: boolean;
// }) {
//   return (
//     <label className="flex cursor-pointer items-center gap-3">
//       <Checkbox
//         defaultChecked={checked}
//         className="h-[16px] w-[16px] rounded-[3px] border-slate-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
//       />

//       <span>{label}</span>
//     </label>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                               JOB CARD                                     */
// /* -------------------------------------------------------------------------- */

// function JobCard({
//   job,
//   selected,
//   onClick,
// }: {
//   job: Job;
//   selected: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={cn(
//         "group relative w-full rounded-[11px] border bg-white p-4 text-left transition-all",
//         selected
//           ? "border-blue-500 shadow-[0_4px_18px_rgba(37,99,235,0.15)]"
//           : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
//       )}
//     >
//       {selected && (
//         <div className="pointer-events-none absolute -inset-[2px] rounded-[13px] border border-blue-500 opacity-20" />
//       )}

//       <div className="flex gap-4">
//         {/* Logo */}
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
//           <span className="rounded-md p-1 bg-light *:rounded">
//             <Avatar size="lg" className="rounded-md p-1 bg-light *:rounded">
//               <AvatarImage
//                 src="https://github.com/shadcn.png"
//                 alt={job.company ?? "Company Name"}
//               />
//               <AvatarFallback className="bg-secondary-brand font-semibold text-white">
//                 {getInitials(job.company ?? "Company Name")}
//               </AvatarFallback>
//             </Avatar>
//           </span>
//         </div>

//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <h3 className="text-[16px] font-bold leading-tight text-slate-900">
//                 {job.title}
//               </h3>

//               <p className="mt-1 text-[13px] font-medium text-blue-600">
//                 {job.company}
//               </p>
//             </div>

//             {job.hot && (
//               <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-600">
//                 Hot
//               </span>
//             )}
//           </div>

//           <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
//             <span className="flex items-center gap-1">
//               <MapPin className="h-3 w-3" />
//               {job.location}
//             </span>

//             <span className="flex items-center gap-1">
//               <Clock3 className="h-3 w-3" />
//               {job.employment}
//             </span>

//             <span className="flex items-center gap-1 font-semibold text-slate-800">
//               <DollarSign className="h-3 w-3" />
//               {job.salary}
//             </span>
//           </div>

//           <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-slate-500">
//             {job.description}
//           </p>
//         </div>
//       </div>
//     </button>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                             JOB DETAILS                                    */
// /* -------------------------------------------------------------------------- */

// function JobDetails({ job }: { job: Job2 }) {
//   const [bookmarked, setBookmarked] = React.useState(false);

//   return (
//     <div className="flex h-full flex-col bg-white">
//       {/* Header */}
//       <div className="border-b border-slate-100 px-7 pb-5 pt-6">
//         <div className="mb-5 flex justify-end gap-2">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-9 w-9 rounded-lg border-slate-300"
//           >
//             <Share2 className="h-4 w-4" />
//           </Button>

//           <Button
//             variant="outline"
//             size="icon"
//             onClick={() => setBookmarked(!bookmarked)}
//             className={cn(
//               "h-9 w-9 rounded-lg border-slate-300",
//               bookmarked && "bg-blue-50 text-blue-600"
//             )}
//           >
//             <Bookmark
//               className="h-4 w-4"
//               fill={bookmarked ? "currentColor" : "none"}
//             />
//           </Button>
//         </div>

//         <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200">
//           <img src={job.logo} alt="" className="h-full w-full object-cover" />
//         </div>

//         <h1 className="mt-5 text-[22px] font-bold tracking-tight text-slate-900">
//           {job.title}
//         </h1>

//         <p className="mt-1 text-[15px] font-semibold text-blue-600">
//           {job.company}
//         </p>

//         <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-500">
//           <span className="flex items-center gap-1.5">
//             <MapPin className="h-3.5 w-3.5" />
//             {job.location}
//           </span>

//           <span className="flex items-center gap-1.5">
//             <BriefcaseBusiness className="h-3.5 w-3.5" />
//             {job.employment}
//           </span>

//           <span className="flex items-center gap-1.5">
//             <Sparkles className="h-3.5 w-3.5" />
//             {job.level} Level
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto px-7 py-6">
//         <DetailSection title="About the Role">
//           <p>{job.about}</p>
//         </DetailSection>

//         {job.responsibilities.length > 0 && (
//           <DetailSection title="Responsibilities">
//             <ul className="space-y-3">
//               {job.responsibilities.map((item, index) => (
//                 <li key={index} className="flex gap-3">
//                   <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
//                   <span>{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </DetailSection>
//         )}

//         {job.benefits.length > 0 && (
//           <DetailSection title="Benefits">
//             <div className="grid grid-cols-2 gap-3">
//               {job.benefits.map((benefit) => (
//                 <div
//                   key={benefit.title}
//                   className="rounded-lg border border-slate-200 bg-slate-50 p-3"
//                 >
//                   <div className="mb-2 text-blue-600">{benefit.icon}</div>

//                   <p className="text-[11px] font-bold text-slate-800">
//                     {benefit.title}
//                   </p>

//                   <p className="mt-0.5 text-[10px] text-slate-500">
//                     {benefit.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </DetailSection>
//         )}
//       </div>

//       {/* Apply */}
//       <div className="border-t border-slate-100 px-7 py-5">
//         <Button className="h-11 w-full rounded-lg bg-blue-600 text-sm font-semibold shadow-[0_5px_12px_rgba(37,99,235,0.2)] hover:bg-blue-700">
//           Apply Now
//           <span className="ml-1 text-lg">→</span>
//         </Button>

//         <p className="mt-3 text-center text-[10px] text-slate-400">
//           Estimated application time: 5 minutes
//         </p>
//       </div>
//     </div>
//   );
// }

// function DetailSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="mb-7">
//       <h2 className="mb-4 text-[14px] font-bold text-slate-900">{title}</h2>

//       <div className="text-[12px] leading-5 text-slate-500">{children}</div>
//     </section>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*                                  PAGE                                      */
// /* -------------------------------------------------------------------------- */

// export default function JobsPage() {
//   const [selectedJobId, setSelectedJobId] = React.useState(1);

//   const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];

//   return (
//     <main className="min-h-screen bg-white">
//       <div className="mx-auto flex max-w-[1450px] gap-7 px-6 py-5">
//         {/* LEFT FILTERS */}
//         <FilterSidebar />

//         {/* CENTER */}
//         <section className="min-w-0 flex-1 border">
//           {/* Top bar */}
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-[13px] font-semibold text-slate-400">
//               <span className="text-slate-700">128</span> open positions
//             </h2>

//             <div className="flex items-center gap-2 text-[12px]">
//               <span className="text-slate-500">Sort by:</span>

//               <Select defaultValue="newest">
//                 <SelectTrigger className="h-auto w-auto gap-1 border-0 bg-transparent p-0 text-xs font-semibold text-slate-700 shadow-none focus:ring-0">
//                   <SelectValue />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="newest">Newest</SelectItem>
//                   <SelectItem value="salary-high">
//                     Salary: High to Low
//                   </SelectItem>
//                   <SelectItem value="salary-low">
//                     Salary: Low to High
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Jobs */}
//           <div className="space-y-4">
//             {jobs.map((job) => (
//               <JobCard
//                 key={job.id}
//                 job={job}
//                 selected={selectedJobId === job.id}
//                 onClick={() => setSelectedJobId(job.id)}
//               />
//             ))}
//           </div>
//         </section>

//         {/* RIGHT DETAILS */}
//         <aside className="hidden w-[410px] shrink-0 overflow-hidden rounded-t-none border border-slate-200 lg:block">
//           <JobDetails job={selectedJob} />
//         </aside>
//       </div>

//       {/* Mobile details */}
//       <div className="mt-8 border-t lg:hidden">
//         <JobDetails job={selectedJob} />
//       </div>
//     </main>
//   );
// }
