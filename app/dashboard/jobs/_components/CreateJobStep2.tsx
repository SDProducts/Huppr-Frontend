"use client";

import RoleRequirementsField, {
  INITIAL_REQUIREMENTS,
} from "@/components/form/RoleRequirementsField";
import { Form, Formik } from "formik";

const CreateJobStep2 = () => {
  return (
    <div>
      <Formik
        initialValues={{
          jobTitle: "",
          requirements: INITIAL_REQUIREMENTS,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="space-y-6">
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <RoleRequirementsField name="requirements" />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Save Job
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateJobStep2;
