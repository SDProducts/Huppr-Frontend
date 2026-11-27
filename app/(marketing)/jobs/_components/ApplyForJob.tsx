"use client";
import FileUpload from "@/components/form/FileUpload";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { useApplyForJob } from "@/hooks/job seeker/useJobs";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { ArrowRight, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
interface Props {
  propJobId?: string;
}
export default function ApplyForJob({ propJobId }: Props) {
  const { jobId } = useParams();
  const { close } = useModal();
  const { mutate: apply, isPending } = useApplyForJob(
    propJobId || String(jobId)
  );
  const formData: ApplyForJobPayload = {
    fullName: "",
    email: "",
    phone: "",
    currentRole: "",
    currentCompany: "",
    resumeUrl: "",
  };

  function handleApply(params: typeof formData) {
    apply(params, {
      onSuccess() {
        close();
      },
    });
  }
  return (
    <div>
      <Formik initialValues={formData} onSubmit={handleApply}>
        {() => {
          return (
            <Form className="space-y-10 p-4">
              <div className="space-y-4">
                <div className="space-y-6 ">
                  <div className="space-y-2">
                    <Input
                      name="fullName"
                      label="Full Name"
                      placeholder="Sarah Johnson"
                      LabelClassName="text-xs"
                      className="bg-gray-200"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="email"
                        label="Email"
                        placeholder="sarah.johnson@example.com"
                        LabelClassName="text-xs"
                        className="bg-gray-200"
                      />
                      <Input
                        name="phone"
                        label="Phone Number"
                        LabelClassName="text-xs"
                        placeholder="2345678912345"
                        className="bg-gray-200"
                      />
                    </div>
                    <FileUpload name="resume" label="Resume or CV" />
                    <Input
                      type="textarea"
                      name="coverLetter"
                      label="Cover Letter"
                      LabelClassName="text-xs"
                      className="bg-gray-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className={cn("p-5")}
                  type="submit"
                  disabled={isPending}
                >
                  <span>{isPending ? "Submitting" : "Submit"} Application</span>
                  {isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <ArrowRight />
                  )}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
