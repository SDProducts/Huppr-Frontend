/* eslint-disable react/no-unescaped-entities */
import CreateRoleStep3 from "@/app/dashboard/departments/_components/CreateRoleStep3";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import ListInputField from "@/components/form/ListInput";
import SearchableSelect from "@/components/form/SearchableSelect";
import TagsInput from "@/components/form/TagsInput";
import { CreateRoleStep2Skeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/context/modal.state";
import {
  useGetRolesById,
  useInvalidateQueries,
  usePatchNewRole,
} from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Globe,
  Lightbulb,
} from "lucide-react";
import React from "react";
interface Prop {
  roleID?: string;
}
const CreateRoleStep2: React.FC<Prop> = ({ roleID }) => {
  const modal = useModal();
  const { data: roleData, isLoading } = useGetRolesById(roleID);
  const { mutate: patchRole, isPending } = usePatchNewRole(roleID || "");
  const clearQuery = useInvalidateQueries();
  if (isLoading || (!roleData && roleID)) {
    return <CreateRoleStep2Skeleton />;
  }

  const initialValues: CreateRolePayload = {
    expectedRevision: 0,
    requirements: {
      responsibilities: roleData?.requirements.responsibilities || [""],
      minYears: roleData?.requirements.minYears || 1,
      maxYears: roleData?.requirements.maxYears || 10,
      languages: roleData?.requirements.languages || [],
      certifications: roleData?.requirements.certifications || [],
      skills: roleData?.requirements.skills || [],
      minimumDegree: roleData?.requirements.minimumDegree || "",
      fieldOfStudy: roleData?.requirements.fieldOfStudy || "",
      otherRequirements: roleData?.requirements.otherRequirements || "",
    },
  };
  const submit = (values: typeof initialValues) => {
    patchRole(values, {
      onSuccess(data) {
        modal.open({
          content: <CreateRoleStep3 roleId={data.id} />,
          size: "sm:w-2xl",
          bgColor: "bg-gray-100",
          goBack: () => {
            clearQuery(["roles"]);
            modal.open({
              content: <CreateRoleStep2 roleID={data.id} />,
              size: "sm:w-[80%] md:w-4xl",
              bgColor: "bg-[#F7F9FC]",
            });
          },
        });
      },
    });
  };

  return (
    <div className="min-h-[400px] px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Role Requirements</h2>
        <p className="text-sm">
          Specify the core competencies, technical skills, and background
          required for a candidate to be successful in this role.
        </p>
      </div>
      <Stepper currentStep={2} />

      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values }) => {
          return (
            <Form>
              <div className="space-y-7">
                <div className="grid grid-cols-[2fr_1fr] gap-2 ">
                  <div className="space-y-4">
                    <ListInputField
                      className="bg-white p-4"
                      name="requirements.responsibilities"
                      label="Job Responsobilities"
                      helpText="What will this person do on a daily basis?"
                      placeholder="Type responsibility here."
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-4 bg-white rounded-md space-y-4 flex flex-col justify-between">
                        <div className="">
                          <div className="font-semibold text-lg">
                            Required Skills
                          </div>
                          <p className="text-xs">
                            Hard and soft skills needed.
                          </p>
                        </div>
                        <TagsInput name="requirements.skills" />
                      </div>
                      <div className="p-4 bg-white rounded-md space-y-4">
                        <div className="">
                          <div className="font-semibold text-lg">
                            Qualifications{" "}
                          </div>
                          <p className="text-xs">Eductaional background.</p>
                        </div>
                        <SearchableSelect
                          label="Minimum Degree"
                          name="requirements.minimumDegree"
                          options={[
                            {
                              label: "Bachelors Degree",
                              value: "Bachelors Degree",
                            },
                            { value: "High School", label: "High School" },
                            { value: "College", label: "College" },
                            {
                              value: "Elementry School",
                              label: "Elementry School",
                            },
                          ]}
                          labelClassName="text-sm"
                        />
                        <Input
                          label="Field of Study"
                          name="requirements.fieldOfStudy"
                          placeholder="Computer Science"
                          LabelClassName="text-sm"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-md">
                      <Input
                        type="textarea"
                        name="requirements.otherRequirements"
                        label="Other Requirements"
                        helpText="Any additional context or specific physical/travel needs."
                        rows={2}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-md space-y-6">
                      <div className="flex items-center gap-1 font-semibold text-lg">
                        <BriefcaseBusiness className="text-primary" />{" "}
                        <div className="">Experience</div>
                      </div>
                      <div className="flex items-end gap-2">
                        <Input
                          type="number"
                          label="Min Years"
                          name="requirements.minYears"
                          className="p-2.5!"
                          LabelClassName="text-xs"
                        />
                        <div className="h-0.5 w-10 mb-5 bg-gray-300" />
                        <Input
                          type="number"
                          label="Max Years"
                          name="requirements.maxYears"
                          LabelClassName="text-xs"
                          className="p-2.5!"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-md space-y-4">
                      <div className=" space-y-4">
                        <div className="flex items-center gap-1 font-semibold text-lg">
                          <Award className="text-primary" />{" "}
                          <div className="">Certifications</div>
                        </div>
                        <TagsInput
                          name="requirements.certifications"
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>
                      <Separator className={"my-6"} />
                      <div className="space-y-4">
                        <div className="flex items-center gap-1 font-semibold text-lg">
                          <Globe className="text-primary" />{" "}
                          <div className="">Language</div>
                        </div>
                        <TagsInput
                          name="requirements.languages"
                          placeholder="e.g., English"
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-primary-100 rounded-md mt-7">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="text-primary" />
                        <div className="">
                          <div className="text-primary font-bold">
                            AI Suggestion
                          </div>
                          <div className="text-sm">
                            Consider adding "Agile Methodologies" to required
                            skills based on similar Senior Backend roles in your
                            industry.
                          </div>
                          <div className="text-primary font-bold">
                            Apply Suggestion
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12 pb-5 flex items-center justify-between">
                <div className="">
                  <Button
                    label="Back"
                    icon={<ArrowLeft />}
                    onClick={modal.goBack}
                    className="w-fit! bg-transparent text-gray-500!"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => patchRole(values)}
                    label="Save as draft"
                    isLoading={isPending}
                    disabled={isPending}
                    className="bg-transparent! text-primary! border"
                  />
                  <Button
                    label="Continue"
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    rightIcon={<ArrowRight />}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateRoleStep2;
