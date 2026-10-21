/* eslint-disable react/no-unescaped-entities */
import CreateRoleStep1 from "@/app/dashboard/departments/_components/CreateRoleStep1";
import Checkbox from "@/components/form/Checkbox";
import DragableListInput from "@/components/form/DragagbleListInput";
import Input from "@/components/form/Input";
import RichTextEditor from "@/components/form/RichTextEditor";
import SearchableSelect from "@/components/form/SearchableSelect";
import TabsSelectField from "@/components/form/TabSelectInput";
import { PageLoader } from "@/components/global/PageLoader";
import { SelectInputSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import { useModal } from "@/context/modal.state";
import { initialvalues } from "@/data/constants";
import { useGetDepartments, useGetRoles } from "@/hooks/employer/useDepartment";
import { useGetJobById, usePatchJob } from "@/hooks/employer/useJobs";
import { getDate, labelCase } from "@/lib/utils";
import { CreateJobPayload } from "@/types/create_job_payload";
import { JobItem } from "@/types/department_roles";
import { JobDetailResponse } from "@/types/job_by_id";
import { Form, Formik, useFormikContext } from "formik";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  BriefcaseBusiness,
  Cake,
  GraduationCap,
  ListChecks,
  MapPin,
  PencilSparkles,
  Plus,
  RefreshCcw,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const WORK_ARRANGEMENT = [
  { label: "remote ", value: "remote" },
  { label: "hybrid", value: "hybrid" },
  { label: "On site", value: "on_site" },
];
const LEVELS = [
  { label: "Entry Level", value: "entry" },
  { label: "Junior", value: "junior" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Senior ", value: "senior" },
];
const TYPES = [
  { label: "Fulltime ", value: "full_time" },
  { label: "Parttime", value: "part_time" },
  { label: "Contract", value: "contract" },
];
const BENEFITS: Option[] = [
  { label: "Annual Leave", value: "annual" },
  { label: "Sick Leave", value: "sick" },
  { label: "Study Leave", value: "study" },
  { label: "Paid Leave", value: "paid_leave" },
  { label: "Comprehensive Health Insurance", value: "health" },
  { label: "401k / Pension Match (5%)", value: "pension" },
  { label: "Home Office Setup Allowance", value: "setup" },
];

// Observer component to update form values when the selected role changes
function RoleObserver({
  roles,
  jobData,
}: {
  roles: JobItem[];
  jobData: JobDetailResponse;
}) {
  const { values, setFieldValue } = useFormikContext<CreateJobPayload>();

  useEffect(() => {
    if (!values.roleId) return;

    // Find the selected role object from the list
    const selectedRole = roles.find((r) => r.id === values.roleId);

    if (selectedRole) {
      // Auto-fill form fields mapping to CreateJobPayload schema keys
      if (values.roleId === jobData.roleId) {
        setFieldValue("title", jobData.title || "");
        setFieldValue("summary", jobData.summary || "");
        setFieldValue("departmentId", jobData.departmentId || "");
        setFieldValue("roleId", jobData.roleId || "");
        // Map requirements.responsibilities string array to objects if payload expects objects or handle as strings
        setFieldValue(
          "responsibilities",
          //   jobData.responsibilities || []
          (jobData.responsibilities || []).map((resp) => resp.body)
        );
        // setFieldValue(
        //   "benefits",
        //   (jobData.benefits || []).map((b) => ({ label: b }))
        // );

        setFieldValue("salaryMax", jobData.salaryMax || 0);
        setFieldValue("salaryMin", jobData.salaryMin || 0);
        setFieldValue("experienceMinYears", jobData.experienceMinYears || 0);
        setFieldValue(
          "educationRequirement",
          jobData.educationRequirement || ""
        );
        setFieldValue("workArrangement", jobData.workArrangement || "");
        setFieldValue("employmentType", jobData.employmentType || "");
        setFieldValue("seniorityLevel", jobData.seniorityLevel || "");
        setFieldValue("locationCity", jobData.locationCity || "");
        setFieldValue("currency", jobData.currency || "NGN");
      } else {
        setFieldValue("title", selectedRole.name || "");
        setFieldValue("summary", selectedRole.description || "");
        setFieldValue("departmentId", selectedRole.departmentId || "");
        // setFieldValue("roleId", selectedRole.id || "");
        // Map requirements.responsibilities string array to objects if payload expects objects or handle as strings
        setFieldValue(
          "responsibilities",
          selectedRole.requirements?.responsibilities || []
          // (selectedRole.requirements?.responsibilities || []).map((resp) => ({
          //   body: resp,
          // }))
        );
        // Map benefits array of strings to objects matching JobBenefit { label: string }
        // setFieldValue(
        //   "benefits",
        //   (selectedRole.benefits?.benefits || []).map((b) => ({ label: b }))
        // );

        setFieldValue("salaryMax", selectedRole.benefits?.maximumSalary || 0);
        setFieldValue("salaryMin", selectedRole.benefits?.minimumSalary || 0);

        setFieldValue(
          "experienceMinYears",
          selectedRole.requirements?.minYears || 0
        );
        setFieldValue(
          "educationRequirement",
          selectedRole.requirements?.minimumDegree || ""
        );
        setFieldValue("workArrangement", selectedRole.workArrangement || "");
        setFieldValue("employmentType", selectedRole.employmentType || "");
        setFieldValue("seniorityLevel", selectedRole.level || "");
        setFieldValue("locationCity", selectedRole.location || "");
        setFieldValue("currency", selectedRole.benefits?.currency || "NGN");
      }

      // Map skills if needed or qualifications
      //   setFieldValue(
      //     "skills",
      //     (selectedRole.requirements?.skills || []).map((s) => ({
      //       name: s,
      //       level: "working",
      //       isRequired: true,
      //     }))
      //   );
    }
  }, [values.roleId, roles, jobData, setFieldValue]);

  return null;
}

const EditJobStep1 = () => {
  const URLParams = new URLSearchParams();
  const searchParams = useSearchParams();

  const modal = useModal();
  const router = useRouter();
  const jobId = searchParams.get("jobId");
  const { data: jobData, isLoading: isgettingJob } = useGetJobById(jobId || "");

  const { mutate: patchJob, isPending: creatingJob } = usePatchJob(jobId || "");
  const { data, isLoading: isgettingRoles } = useGetRoles({});
  const { data: departmentData, isLoading: isGettingDepartments } =
    useGetDepartments({});

  if (isgettingJob || !jobData) {
    return <PageLoader />;
  }

  const roles = data?.items || [];
  const roleOptions = roles.map((role) => ({
    label: `${role.name} ● ${labelCase(role.level)} Level ● ${labelCase(
      role.employmentType
    )}`,
    value: role.id,
    subText: `${labelCase(role.workArrangement)} ● updated on ${getDate(
      role.updatedAt
    )}`,
    icon: (
      <div className="flex justify-center items-center h-8 w-8 bg-primary text-white rounded-sm">
        <PencilSparkles className="size-4" />
      </div>
    ),
  }));
  const departments = departmentData?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const { roleId, ...rest } = initialvalues.createJobPayload;
  console.log(roleId);
  const formValues: CreateJobPayload = {
    ...rest,
    roleId: jobData.roleId,
  };

  function handleNewRole() {
    modal.open({
      content: <CreateRoleStep1 />,
      size: "sm:w-3xl",
      bgColor: "bg-[#F7F9FC]",
    });
  }
  const submit = (values: CreateJobPayload) => {
    // Transform string array into the expected { body: string }[] structure for submission
    const formatttedResponsibilities = values.responsibilities?.map((rep) => {
      if (typeof rep === "string") {
        return { body: rep };
      }
      return rep;
    });
    // console.log(formatttedResponsibilities);
    const formattedValues: CreateJobPayload = {
      ...values,
      responsibilities: formatttedResponsibilities,
      experienceMinYears: Number(values.experienceMinYears),
      expectedRevision: jobData.revision,
    };
    patchJob(formattedValues, {
      onSuccess(data: JobItem) {
        URLParams.set("step", "2");
        URLParams.set("jobId", data.id);
        router.replace(`/dashboard/jobs/create-job?${URLParams.toString()}`);
      },
    });
  };

  return (
    <div>
      <Formik initialValues={formValues} onSubmit={submit}>
        {({ values, isValid }) => {
          return (
            <Form className="space-y-4">
              <RoleObserver roles={roles} jobData={jobData} />
              <div className="bg-white p-8 space-y-3 rounded-2xl">
                <div className="flex justify-between gap-5">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="size-5 text-primary" />{" "}
                    <div className="text-xl font-bold">Change Job Role</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 px-2 rounded-sm">
                    <div className="">
                      Can't find the role you're looking for?
                    </div>
                    <div
                      className="flex gap-0.5 items-center font-bold cursor-pointer"
                      onClick={handleNewRole}
                    >
                      <Plus className="size-3" strokeWidth={4} />
                      <div className="">New Rrole</div>
                    </div>
                  </div>
                </div>
                <div className="">
                  {isgettingRoles ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      name="roleId"
                      options={roleOptions}
                      className="bg-primary/5"
                      placeholder="Select Role"
                    />
                  )}
                </div>
                <div className="flex items-start gap-2 text-sm bg-primary/5 p-2 rounded-md">
                  <BadgeCheck className="text-primary" />
                  <div className="">
                    <span className="text-primary font-bold">
                      Role details loaded from your organisation.
                    </span>{" "}
                    Changes made here apply to this job posting only. Your
                    organisation's role definition will remain unchanged.
                  </div>
                </div>
              </div>
              {values.roleId && (
                <div className="space-y-10">
                  <div className="grid grid-cols-[1fr_2fr] gap-6">
                    <div className="space-y-4">
                      <div className="bg-white p-7 rounded-2xl space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <SlidersHorizontal className="size-4 text-primary" />
                            <div className="text-lg font-bold">
                              Role Parameters
                            </div>
                          </div>
                          <div className="bg-gray-300 px-2 py-0.5 rounded-full text-xs">
                            Core Specs
                          </div>
                        </div>
                        <div className="space-y-4">
                          <Input
                            label="Job Title"
                            name="title"
                            className="bg-gray-200"
                            LabelClassName="text-sm"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {isGettingDepartments || !departments ? (
                              <SelectInputSkeleton />
                            ) : (
                              <SearchableSelect
                                label="Department"
                                name="departmentId"
                                options={departments!}
                                placeholder="Select industry"
                                labelClassName="text-sm"
                                className="bg-gray-200"
                              />
                            )}

                            <SearchableSelect
                              label="Role Level"
                              name="seniorityLevel"
                              options={LEVELS}
                              className="bg-gray-200"
                              labelClassName="text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <SearchableSelect
                              label="Employment Type"
                              name="employmentType"
                              options={TYPES}
                              className="bg-gray-200"
                              labelClassName="text-sm"
                            />
                            <SearchableSelect
                              label="Reporting Manager"
                              name="reportingManagerId"
                              options={[]}
                              className="bg-gray-200"
                              labelClassName="text-sm"
                            />
                          </div>
                          <TabsSelectField
                            name="workArrangement"
                            label="Work Arrangement"
                            options={WORK_ARRANGEMENT}
                            className="bg-gray-200"
                          />
                          <Input
                            icon={<MapPin className="size-3 text-primary" />}
                            label="Office Location"
                            name="locationCity"
                            className="bg-gray-200"
                            LabelClassName="text-sm"
                          />
                          <div>
                            <div className="text-sm mb-1">
                              Salary Range (Annual)
                            </div>
                            <div className="grid grid-cols-[1fr_4fr] gap-1">
                              <Input
                                name="currency"
                                className="bg-gray-200"
                                LabelClassName="text-sm"
                              />
                              <div className="flex items-center gap-1">
                                <Input
                                  name="salaryMin"
                                  className="bg-gray-200"
                                  LabelClassName="text-sm"
                                  formatMoney
                                />
                                <div className="text-sm px-0.5">to</div>
                                <Input
                                  name="salaryMax"
                                  className="bg-gray-200"
                                  LabelClassName="text-sm"
                                  formatMoney
                                />{" "}
                              </div>
                            </div>
                            <div className="text-xs mt-4">
                              Shown to candidates on public job portal as
                              standard competitive range.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-7 space-y-3 bg-linear-to-br from-primary/50 via-gray-100 to-white rounded-2xl">
                        <div className="flex justify-between items-center">
                          <div className="text-primary font-semibold">
                            Vita AI Job Score
                          </div>
                          <div className="bg-primary text-white text-xs px-4 py-1 rounded-full">
                            96/100
                          </div>
                        </div>
                        <div className="">
                          Role description covers 94% of standard Figma &
                          Systems design criteria. Benchmark matches top tier
                          remote talent pipelines.
                        </div>
                        <div className="">
                          <Progress indicatorClassName="" value={96} />
                        </div>
                        <div className="flex items-center text-sm text-primary gap-2">
                          <Sparkles className="size-4" />
                          <div className="">
                            Optimize with Vita AI Assistant
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white p-7 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <SlidersHorizontal className="size-4 text-primary" />
                              <div className="text-lg font-bold">
                                Job Summary
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <RefreshCcw className="size-3" />
                              Synced from role
                            </div>
                          </div>
                          <div className="text-xs">
                            Provide a compelling narrative overview of the
                            position, mission, and how this person contributes
                            to company objectives.
                          </div>
                        </div>

                        <RichTextEditor name="summary" />
                      </div>

                      <div className="bg-white p-7 rounded-2xl space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <ListChecks className="size-4 text-primary" />
                              <div className="text-lg font-bold">
                                Key Responsibilities
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-primary font-bold cursor-pointer">
                              <Plus className="size-3" strokeWidth={4} />
                              Add Responsibility{" "}
                            </div>
                          </div>
                          <div className="text-sm">
                            Drag to re-order priorities. Candidates see
                            responsibilities in this exact order.
                          </div>
                        </div>

                        <div className="">
                          <DragableListInput name="responsibilities" />
                        </div>
                      </div>
                      <div className="bg-white p-7 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="size-4 text-primary" />
                            <div className="text-lg font-bold">
                              Requirements & Qualifications
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            3 Core Thresholds
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-gray-300 p-5 rounded-md">
                            <div className="uppercase">Experience</div>
                            <div className="grid grid-cols-4">
                              <div className="">
                                <Input
                                  type="number"
                                  name="experienceMinYears"
                                  className="border-none py-0!"
                                  inputClassName="px-0! font-bold! text-lg!"
                                  placeholder="Exp"
                                />
                              </div>
                              <div className="font-bold text-lg flex-1 col-span-3">
                                + Years
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-300 p-5 rounded-md">
                            <div className="uppercase">Education</div>
                            <Input
                              name="educationRequirement"
                              className="border-none py-0!"
                              inputClassName="px-0! font-bold! text-lg!"
                              placeholder="Enter Education"
                            />
                            {/* <div className="font-bold text-lg">
                              {values.educationRequirement}
                            </div> */}
                          </div>
                          <div className="bg-gray-300 p-5 rounded-md">
                            <div className="uppercase">PRIMARY TOOLING</div>
                            <Input
                              name="primaryTooling"
                              className="border-none py-0!"
                              inputClassName="px-0! font-bold! text-lg!"
                              placeholder="E.g. Figma, VS code"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="font-semibold">
                            Additional Desired Qualifications
                          </div>
                          <div className="bg-gray-200 px-4 py-2 text-sm rounded-md">
                            Familiarity with HTML/CSS fundamentals, micro-copy
                            writing, and WCAG AA accessibility standards.
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-7 rounded-2xl space-y-4">
                        <div className="">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Cake className="size-4 text-primary" />
                              <div className="text-lg font-bold">
                                Role Benefits & Perks{" "}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {values.benefits?.length} Selected
                            </div>
                          </div>
                          <div className="text-sm">
                            Select the compensation perks linked with this job
                            posting.
                          </div>
                        </div>
                        <div className="">
                          <Checkbox
                            name="benefits"
                            type="multiple"
                            options={BENEFITS}
                            //   label={`${item.group} Permissions`}
                            orientationStyle="grid sm:grid-cols-2 gap-1"
                            labelClassName="font-bold text-primary! underline underline-offset-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl flex justify-between shadow">
                    <div className="flex gap-2">
                      <Button
                        className="w-fit! bg-transparent! text-gray-800!"
                        label="Cancel"
                      />
                      <Button
                        className="w-fit! bg-gray-200! text-black!"
                        label="Save as Draft"
                        disabled={creatingJob}
                        icon={<Bookmark className="size-5" />}
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="">
                        <div className="text-sm">
                          Step 1 {isValid ? "Completed" : "Invalid"}
                        </div>
                        <div className="font-semibold">
                          Next: Candidate Pipeline Setup
                        </div>
                      </div>
                      <Button
                        className="w-fit!"
                        disabled={creatingJob}
                        isLoading={creatingJob}
                        label="Continue to ATS & Screening"
                        rightIcon={<ArrowRight className="size-5" />}
                        type="submit"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditJobStep1;
