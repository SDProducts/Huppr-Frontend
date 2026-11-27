"use client";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/modal.state";
import { useEditCandidate } from "@/hooks/employer/useJobs";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { BriefcaseBusiness, Loader2, Save, User } from "lucide-react";
import {
  FaBriefcase,
  FaCog,
  FaGlobe,
  FaLinkedin,
  FaUsers,
} from "react-icons/fa";
import { SiIndeed } from "react-icons/si";
interface Props {
  candidate: Candidate;
}
export default function EditCandidate({ candidate }: Props) {
  const { close } = useModal();
  const { mutate: saveChanges, isPending } = useEditCandidate(candidate.id);
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
  const formData: EditCandidatePayload = {
    fullName: candidate.fullName,
    email: candidate.email,
    phone: candidate.phone,
    source: candidate.source,
    currentRole: candidate.currentRole,
    currentCompany: candidate.currentCompany,
    resumeUrl: candidate.resumeUrl,
    matchScore: candidate.matchScore,
    status: candidate.status,
  };

  function handleAddNewCandidate(params: typeof formData) {
    saveChanges(params, {
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
            <Form className="sm:px-5 space-y-10">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl space-y-6">
                  <div className="flex gap-2">
                    <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
                      <User className="size-6 text-primary" strokeWidth={3} />
                    </div>
                    <div className="">
                      <div className="text-xl font-bold">Personal Info</div>
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
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl space-y-6">
                  <div className="flex gap-2">
                    <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
                      <BriefcaseBusiness
                        className="size-6 text-primary"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="">
                      <div className="text-xl font-bold">Professional Info</div>
                      <p className="text-sm">
                        Provide candidates professional experience and
                        informations.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="currentRole"
                      label="Current Role"
                      placeholder="UX Designer"
                      LabelClassName="text-xs"
                      className="bg-gray-200"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="currentCompany"
                        label="Current Company"
                        placeholder="Google"
                        LabelClassName="text-xs"
                        className="bg-gray-200"
                      />
                      <Input
                        name="resumeUrl"
                        label="Resume Url"
                        LabelClassName="text-xs"
                        className="bg-gray-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl space-y-6">
                  <div className="flex gap-2">
                    <div className="size-10 bg-primary/5 flex items-center justify-center rounded-md">
                      <BriefcaseBusiness
                        className="size-6 text-primary"
                        strokeWidth={3}
                      />
                    </div>
                    <div className="">
                      <div className="text-xl font-bold">Recruitment Info</div>
                      <p className="text-sm">
                        Provide candidates professional experience and
                        informations.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        name="matchScore"
                        label="Match Score"
                        type="number"
                        LabelClassName="text-xs"
                        placeholder="94"
                        className="bg-gray-200"
                      />
                      <SearchableSelect
                        name="source"
                        label="Source"
                        options={sourceOptions}
                        labelClassName="text-xs"
                        className="bg-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant={"ghost"} onClick={close} className={cn("p-5")}>
                  <span>Cancel</span>
                </Button>
                <Button
                  className={cn("p-5")}
                  type="submit"
                  disabled={isPending}
                >
                  <span>{isPending ? "Saving" : "Save"} Changes</span>
                  {isPending ? <Loader2 className="animate-spin" /> : <Save />}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
