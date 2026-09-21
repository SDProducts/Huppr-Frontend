import SearchableSelect from "@/components/form/SearchableSelect";
import Button from "@/components/ui/CustomButton";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CreateRoleStep3 = () => {
  const initialValues = {
    responsibilities: [""],
    report_to: "",
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
    <div>
      <div className=""></div>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => {
          return (
            <Form>
              <div className="">
                <div className="p-4 rounded-md bg-white">
                  <div className="">Hierarchy</div>
                  <SearchableSelect
                    label="Reports to"
                    name="report_to"
                    options={[]}
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

export default CreateRoleStep3;
