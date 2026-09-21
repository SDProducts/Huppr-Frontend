import Input from "@/components/form/Input";
import ListInputField from "@/components/form/ListInput";
import Select from "@/components/form/Select";
import TagsInput from "@/components/form/TagsInput";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { Form, Formik } from "formik";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

const CreateRoleStep2 = () => {
  const initialValues = {
    responsibilities: [""],
    minXP: "",
    maxXP: "",
    language: "",
    certification: "",
    skils: [],
    degree: "",
    field: "",
    other: "",
  };
  const submit = () => {};

  return (
    <div className="min-h-[400px] px-4">
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => {
          return (
            <Form>
              <div className=" p-5 space-y-7">
                <div className="grid grid-cols-[2fr_1fr] gap-2 ">
                  <div className="space-y-4">
                    <ListInputField
                      className="bg-white p-4"
                      name="responsibilities"
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
                        <TagsInput name="skills" />
                      </div>
                      <div className="p-4 bg-white rounded-md space-y-4">
                        <div className="">
                          <div className="font-semibold text-lg">
                            Qualifications{" "}
                          </div>
                          <p className="text-xs">Eductaional background.</p>
                        </div>
                        <Select
                          label="Minimum Degree"
                          name="degree"
                          options={[]}
                          labelClassName="text-sm"
                        />
                        <Input
                          label="Field of Study"
                          name="field"
                          placeholder="Computer Science"
                          LabelClassName="text-sm"
                        />
                      </div>
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
                          label="Min Years"
                          name="minXP"
                          className="p-2.5!"
                          LabelClassName="text-xs"
                        />
                        <div className="h-0.5 w-10 mb-5 bg-gray-300" />
                        <Input
                          label="Max Years"
                          name="maxXP"
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
                        <Input
                          name="certificate"
                          placeholder="e.g., AWS Certified Solutions Architect"
                        />
                      </div>
                      <Separator className={"my-6"} />
                      <div className=" space-y-4">
                        <div className="flex items-center gap-1 font-semibold text-lg">
                          <Globe className="text-primary" />{" "}
                          <div className="">Language</div>
                        </div>
                        <Input name="language" placeholder="e.g., English" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-md">
                  <Input
                    type="textarea"
                    name="other"
                    label="Role Description"
                    helpText="Any additional context or specific physical/travel needs."
                    rows={2}
                  />
                </div>
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
                  <Button label="Continue" rightIcon={<ArrowRight />} />
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
