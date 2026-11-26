import AutomationToggle from "@/app/dashboard/jobs/_components/AutomationToggle";
import ColorInput from "@/components/form/ColorInput";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/context/modal.state";
import {
  useCreatePipelineStage,
  useGetAutomations,
} from "@/hooks/employer/useJobs";
import { cn } from "@/lib/utils";
import {
  CreatePipelineStagePayload,
  StageAutomation,
} from "@/types/create_job_payload";
import { Form, Formik } from "formik";
import { Bot, Check, Loader2 } from "lucide-react";
interface Props {
  jobId: string;
}
export default function CreatePipelineStage({ jobId }: Props) {
  const modal = useModal();
  const { mutate: createPipelineStage, isPending } =
    useCreatePipelineStage(jobId);
  const { data: automationData, isLoading: isgettingAutomations } =
    useGetAutomations();
  const automations = automationData?.items || [];
  const initialValues: CreatePipelineStagePayload = {
    name: "",
    description: "",
    accent: "",
    category: "",
    isAssessment: false,
    // hasEnabledAutomation: false,
    automations: automations || [],
  };
  function handleSubmit(params: typeof initialValues) {
    const { automations, ...rest } = params;
    const automationsPayload: StageAutomation[] = automations.map((item) => ({
      kind: item.kind,
      label: item.label,
      isEnabled: item.isEnabled,
      config: item.config,
    }));
    const payload = {
      ...rest,
      automations: automationsPayload,
    };
    createPipelineStage(payload, {
      onSuccess() {
        modal.close();
      },
    });
  }
  const CATEGORY_OPTIONS = [
    { label: "Screening", value: "screening" },
    { label: "Assessment", value: "assessment" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
  ];
  return (
    <div className="min-h-[400px] sm:px-4 space-y-10">
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          const activeRules = values.automations.filter(
            (item) => item.isEnabled
          );
          return (
            <Form className="space-y-10">
              <div className="">
                <Separator />
                <div className="space-y-4 py-8">
                  <Input
                    name="name"
                    placeholder="E.g. Technical interview & live coding"
                    label="Stage Name"
                    className="bg-slate-100"
                    LabelClassName="font-semibold text-sm"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <SearchableSelect
                      name="category"
                      label="Stage Milestone Category"
                      options={CATEGORY_OPTIONS}
                      className="bg-slate-100"
                      labelClassName="font-semibold text-sm"
                    />
                    <ColorInput
                      name="accent"
                      label="Stage Accent Theme"
                      LabelClassName="font-semibold text-sm"
                    />
                  </div>
                  <Input
                    name="description"
                    label="Stage Description & Objectives"
                    type="textarea"
                    placeholder="type in stage descriptions and details here."
                    className="bg-slate-100"
                    LabelClassName="font-semibold text-sm"
                  />
                </div>
                <Separator />
                <div className="py-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-md flex justify-center items-center bg-purple-500/15 text-purple-500">
                      <Bot className="size-4" />
                    </div>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <div className="font-bold">
                          Stage Automations (Vita AI & Workflow)
                        </div>
                        <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[11px] font-medium text-purple-700">
                          {activeRules.length} Active rules
                        </span>
                      </div>
                      <p className="text-xs">
                        Automatically trigger notifications, calendar bookings,
                        or AI evaluations when candidates are moved into this
                        stage.
                      </p>
                    </div>
                  </div>
                  {/* <StageAutomationsField
                    catalog={automations || []}
                    name="automations"
                  /> */}
                  <AutomationToggle
                    name="automations"
                    // stages={["screening"]}
                    // activeStage="screening"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant={"outline"}
                  className={cn("px-6 py-5")}
                  onClick={modal.close}
                >
                  <span>Cancel</span>
                </Button>
                <Button className={cn("px-6 py-5")} type="submit">
                  <span>{isPending ? "Creating..." : "Create Stage"}</span>
                  {!isPending ? (
                    <Check />
                  ) : (
                    <Loader2 className="animate-spin" />
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
