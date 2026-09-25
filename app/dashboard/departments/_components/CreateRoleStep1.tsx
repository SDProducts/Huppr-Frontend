import CreateRoleStep2 from "@/app/dashboard/departments/_components/CreateRoleStep2";
import Stepper from "@/app/dashboard/departments/_components/Steps&Progress";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import {
  CreateRoleStep2Skeleton,
  SelectInputSkeleton,
} from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import {
  useCreateNewRole,
  useGetDepartments,
  useGetRolesById,
  useInvalidateQueries,
  usePatchNewRole,
} from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Building2,
  Home,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
interface Prop {
  roleID?: string;
}

const CreateRoleStep1: React.FC<Prop> = ({ roleID }) => {
  const organisationId = Cookies.get("organisationId");
  const modal = useModal();
  const { department } = useParams();
  const { data, isLoading } = useGetDepartments({
    organisationId: organisationId,
  });
  const clearQuery = useInvalidateQueries();
  const { mutate: createRole, isPending } = useCreateNewRole();
  const { mutate: patchRole, isPending: isPatching } = usePatchNewRole(
    roleID || ""
  );
  const { data: roleData } = useGetRolesById(roleID);
  if (isLoading || (!roleData && roleID)) {
    return <CreateRoleStep2Skeleton />;
  }
  const departments = data?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const departmentData = data?.items.find(
    (item) => item.id === String(department)
  );
  const levels = [
    { label: "Entry Level", value: "entry" },
    { label: "Junior", value: "junior" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Senior ", value: "senior" },
  ];
  const types = [
    { label: "Fulltime ", value: "full_time" },
    { label: "Parttime", value: "part_time" },
    { label: "Contract", value: "contract" },
  ];
  const workArrangements = [
    { label: "On-site ", value: "on_site", icon: <Building2 size={18} /> },
    { label: "Remote", value: "remote", icon: <Home size={18} /> },
    { label: "Hybrid", value: "hybrid", icon: <ArrowRightLeft size={18} /> },
  ];

  const initialValues: CreateRolePayload = {
    departmentId: String(department),
    iconId: String(departmentData?.icon.id),
    name: roleData?.name || "",
    level: roleData?.level || "",
    employmentType: roleData?.employmentType || "",
    location: roleData?.location || "",
    workArrangement: roleData?.workArrangement || "",
    description: roleData?.description || "",
    status: "draft",
  };
  const submit = (values: typeof initialValues) => {
    if (roleID) {
      patchRole(values, {
        onSuccess(data) {
          modal.open({
            content: <CreateRoleStep2 roleID={data.id} />,
            size: "sm:w-[80%] md:w-4xl",
            bgColor: "bg-[#F7F9FC]",
            goBack: () => {
              clearQuery(["roles"]);
              modal.open({
                content: <CreateRoleStep1 roleID={data.id} />,
                size: "sm:w-3xl",
                bgColor: "bg-[#F7F9FC]",
              });
            },
          });
        },
      });
    } else {
      createRole(values, {
        onSuccess(data) {
          modal.open({
            content: <CreateRoleStep2 roleID={data.id} />,
            size: "sm:w-[80%] md:w-4xl",
            bgColor: "bg-[#F7F9FC]",
            goBack: () => {
              modal.open({
                content: <CreateRoleStep1 />,
                size: "sm:w-3xl",
                bgColor: "bg-[#F7F9FC]",
              });
            },
          });
        },
      });
    }
  };
  return (
    <div className="min-h-[400px] px-4 space-y-10">
      <div className="">
        <h2 className="text-2xl font-bold">Create Role</h2>
        <p className="text-sm">Define the foundation for this new position.</p>
      </div>
      <Stepper currentStep={1} />
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values }) => {
          return (
            <Form>
              <div className="bg-white p-5 rounded-lg space-y-7">
                <div className="grid grid-cols-2 gap-2 ">
                  {isLoading || !departments ? (
                    <SelectInputSkeleton />
                  ) : (
                    <SearchableSelect
                      label="Department"
                      name="departmentId"
                      options={departments!}
                      placeholder="Select industry"
                      labelClassName="text-sm"
                      disabled
                    />
                  )}

                  <Input
                    label="Role Name"
                    name="name"
                    LabelClassName="text-sm line-clamp-1"
                    placeholder="e.g.www.sterlingtech.com"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <SearchableSelect
                    label="Role level"
                    name="level"
                    options={levels!}
                    placeholder="Select Level"
                    labelClassName="text-sm"
                  />
                  <SearchableSelect
                    label="Employement type"
                    name="employmentType"
                    options={types!}
                    placeholder="Select Type"
                    labelClassName="text-sm"
                  />
                  <Input
                    label="Location"
                    name="location"
                    placeholder="City, Country"
                    LabelClassName="text-sm"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <RadioGroup
                    label="Work Arrangement"
                    name="workArrangement"
                    options={workArrangements}
                    orientation="horizontal"
                    optionClassName="rounded-md!"
                  />
                </div>
                <Input
                  type="textarea"
                  name="description"
                  label="Role Description"
                  rows={2}
                />
              </div>
              <div className="pt-20 pb-5 flex items-center justify-between">
                <div className="">
                  <Button
                    label="Back"
                    icon={<ArrowLeft />}
                    className="w-fit! bg-transparent text-gray-500!"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    label="Save as draft"
                    loadingLabel="Saving..."
                    onClick={() => {
                      if (roleID) {
                        patchRole(values);
                      } else {
                        createRole(values);
                      }
                    }}
                    className="bg-transparent! text-primary! border"
                    isLoading={isPending || isPatching}
                    disabled={isPending || isPatching}
                  />
                  <Button
                    label="Continue"
                    type="submit"
                    isLoading={isPending || isPatching}
                    disabled={isPending || isPatching}
                    rightIcon={<ArrowRight />}
                    loadingLabel="Saving..."
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

export default CreateRoleStep1;
