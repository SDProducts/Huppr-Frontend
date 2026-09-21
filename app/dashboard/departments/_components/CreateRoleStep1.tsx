import CreateRoleStep2 from "@/app/dashboard/departments/_components/CreateRoleStep2";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SearchableSelect from "@/components/form/SearchableSelect";
import { SelectInputSkeleton } from "@/components/skeletons";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { useGetDepartments } from "@/hooks/employer/useDepartment";
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

const CreateRoleStep1 = () => {
  const organisationId = Cookies.get("organisationId");
  const modal = useModal();
  const { department } = useParams();
  const { data, isLoading } = useGetDepartments({
    organisationId: organisationId,
  });
  const departments = data?.items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const levels = [
    { label: "Entry Level", value: "entry" },
    { label: "Junior", value: "junior" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Senior ", value: "senior" },
  ];
  const types = [
    { label: "Fulltime ", value: "Fulltime" },
    { label: "Parttime", value: "Parttime" },
    { label: "Contract", value: "Contract" },
  ];
  const workArrangements = [
    { label: "On-site ", value: "On-site", icon: <Building2 size={18} /> },
    { label: "Remote", value: "Remote", icon: <Home size={18} /> },
    { label: "Hybrid", value: "Hybrid", icon: <ArrowRightLeft size={18} /> },
  ];
  const initialValues = {
    departmentId: String(department),
    name: "",
    role_level: "",
    employement_type: "",
    location: "",
    work_arrangemet: "",
  };
  const submit = () => {
    modal.open({
      content: <CreateRoleStep2 />,
      size: "sm:w-[80%]",
      bgColor: "bg-primary-100",
    });
  };
  return (
    <div className="min-h-[400px] px-4">
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => {
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
                    name="role_level"
                    options={levels!}
                    placeholder="Select Level"
                    labelClassName="text-sm"
                  />
                  <SearchableSelect
                    label="Employement type"
                    name="employement_type"
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
                    name="wprk_arrangement"
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
                    className="bg-transparent! text-primary! border"
                  />
                  <Button
                    label="Continue"
                    type="submit"
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

export default CreateRoleStep1;
