import { Placeholder } from "@/components/EmptyState";
import ColorInput from "@/components/form/ColorInput";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/context/modal.state";
import { useCreatePipelineStage } from "@/hooks/employer/useJobs";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { Bot, BotOff, Check, Loader2, SlidersHorizontal } from "lucide-react";
interface Props {
  jobId: string;
}
export default function CreatePipelineStage({ jobId }: Props) {
  const modal = useModal();
  const { mutate: createPipelineStage, isPending } =
    useCreatePipelineStage(jobId);
  const initialValues = {
    name: "",
    description: "",
    accent: "",
    category: "",
    isAssessment: false,
    // hasEnabledAutomation: false,
    automations: [],
  };
  function handleSubmit(params: typeof initialValues) {
    createPipelineStage(params);
  }
  const CATEGORY_OPTIONS = [
    { label: "Screening", value: "screening" },
    { label: "Assessment", value: "assessment" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
  ];
  return (
    <div className="min-h-[400px] sm:px-4 space-y-10">
      <div className="flex items-center gap-2">
        <div className="size-12 flex justify-center items-center bg-primary/5 text-primary rounded-lg">
          <SlidersHorizontal className="size-6" />
        </div>
        <div className="">
          <h2 className="text-2xl font-extrabold">Create Pipeline Stage</h2>
          <p className="text-sm">
            Define the foundation for this new position.
          </p>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validateOnMount
        onSubmit={handleSubmit}
      >
        {() => {
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
                      <div className="font-bold">
                        Stage Automations (Vita AI & Workflow)
                      </div>
                      <p className="text-xs">
                        Automatically trigger notifications, calendar bookings,
                        or AI evaluations when candidates are moved into this
                        stage.
                      </p>
                    </div>
                  </div>
                  <Placeholder
                    title="No Automations"
                    icon={BotOff}
                    description="No automations set yet."
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
