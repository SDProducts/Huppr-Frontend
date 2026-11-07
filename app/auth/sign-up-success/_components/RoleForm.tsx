"use client";
import RadioGroup from "@/components/form/RadioGroup";
import Button from "@/components/ui/CustomButton";
import { useCompleteSignUp } from "@/hooks/auth/useAuth";
import { RoleSchema } from "@/lib/validation/auth_validations";
import { Form, Formik } from "formik";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const RoleForm = () => {
  const router = useRouter();
  const { mutate: completeSignup, isPending } = useCompleteSignUp();
  const ROLES: Option[] = [
    {
      label: "a Job Seeker",
      value: "job_seeker",
      description: "Looking for new jobs",
    },
    {
      label: "an Employer",
      value: "employer",
      description: "Looking to hire and manage my organisation",
    },
  ];
  const initialValues = {
    role: "employer",
  };
  const submit = (values: typeof initialValues) => {
    completeSignup(values, {
      onSuccess() {
        router.push("/onboarding");
      },
    });
  };
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validateOnMount
        validationSchema={RoleSchema}
        onSubmit={submit}
      >
        {({ isValid }) => (
          <Form className="space-y-4">
            <RadioGroup
              label="Continue as:"
              options={ROLES}
              //   hideIcon
              name="role"
              orientation="horizontal"
              size="sm"
              labelClassName="font-semibold! text-lg!"
              optionClassName="font-medium min-w-[calc(48%)] max-w-[calc(48%)]"
            />
            {isValid && (
              <Button
                label="Continue"
                type="submit"
                isLoading={isPending}
                disabled={isPending || !isValid}
                rightIcon={<ArrowRight />}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoleForm;
