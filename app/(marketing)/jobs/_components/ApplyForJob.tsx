"use client";
import FileUpload from "@/components/form/FileUpload";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { useAddNewCandidate, useGetJobStages } from "@/hooks/employer/useJobs";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { ArrowRight, Loader2, User, Waypoints } from "lucide-react";
import { useParams } from "next/navigation";
import {
  FaBriefcase,
  FaCog,
  FaGlobe,
  FaLinkedin,
  FaUsers,
} from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
interface Props {
  propJobId?: string;
  stageId?: string;
}
export default function ApplyForJob({ propJobId, stageId }: Props) {
  const { jobId } = useParams();
  const { close } = useModal();
  const { mutate: addCandidate, isPending } = useAddNewCandidate(
    propJobId || String(jobId)
  );
  const { data: pipelineData, isLoading } = useGetJobStages(String(jobId));
  const sourceOptions = [
    {
      label: "Career Page",
      value: "careers_page",
      icon: <FaBriefcase />,
    },
    { label: "Linkedin", value: "linkedin", icon: <FaLinkedin /> },
    { label: "Indeed", value: "indeed", icon: <SiIndeed /> },
    { label: "Others", value: "others", icon: <FaGlobe /> },
    {
      label: "Internal Mobility (referrals)",
      value: "referral",
      icon: <FaUsers />,
    },
    { label: "Manual", value: "manual", icon: <FaCog /> },
  ];
  const stageOptions = pipelineData?.items.map((item) => ({
    label: item.name,
    subText: item.description || "...",
    icon: (
      <div className="size-7 flex items-center justify-center rounded-sm bg-primary/10 text-primary">
        <Waypoints className="size-4" />
      </div>
    ),
    value: item.id,
  }));
  const formData: AddNewCandidatePayload = {
    fullName: "",
    email: "",
    phone: "",
    source: undefined,
    currentRole: "",
    currentCompany: "",
    resumeUrl: "",
    matchScore: undefined,
    status: "new",
    stageId: stageId || "",
    jobId: String(jobId),
  };

  function handleAddNewCandidate(params: typeof formData) {
    addCandidate(params, {
      onSuccess() {
        close();
      },
    });
  }
  return (
    <div>
      <Formik initialValues={formData} onSubmit={handleAddNewCandidate}>
        {() => {
          return (
            <Form className="p-2 sm:p-5 rounded-2xl space-y-10 shadow-xl border border-slate-200">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl space-y-6 ">
                  <div className="flex gap-2">
                    <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
                      <User className="size-6 text-primary" strokeWidth={3} />
                    </div>
                    <div className="">
                      <div className="text-xl font-bold">
                        Apply for this Job
                      </div>
                      <p className="text-sm">
                        Provide candidates personal informations.
                      </p>
                    </div>
                  </div>
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
