"use client";

import {
  ArrowLeftRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Eye,
  Mail,
  PanelsTopLeft,
  Star,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export type Assessment = {
  durationMinutes: number;
  format: string;
  pointsTotal: number;
  passingPercent: number;
};

type Props = {
  value?: Assessment;
  onChange: (assessment: Assessment) => void;
  isAssessment: boolean;
  onIsAssessmentChange: (enabled: boolean) => void;
  assessmentTitle?: string;
  assessmentDescription?: string;
  version?: string;
  triggerDescription?: string;
  onPreview?: () => void;
  onChangeAssessment?: () => void;
};

export default function AssessmentSetupField({
  value,
  onChange,
  isAssessment,
  onIsAssessmentChange,
  assessmentTitle = "Senior Product Designer Timed Assessment",
  assessmentDescription = "Focus areas: Design Token Taxonomy, Contrast Ratios & WCAG 2.2 AA",
  version = "v2.4 Live",
  triggerDescription,
  onPreview,
  onChangeAssessment,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const assessment = value ?? {
    durationMinutes: 45,
    format: "2 challenges",
    pointsTotal: 50,
    passingPercent: 80,
  };

  const update = (updates: Partial<Assessment>) => {
    onChange({ ...assessment, ...updates });
  };

  return (
    <section className="space-y-6 rounded-2xl bg-white p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <ClipboardCheck className="size-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Stage 03: Skills Assessment Setup
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Verify design systems, tokens, and WCAG accessibility skills
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Label
            htmlFor="require-assessment"
            className="max-w-32 text-sm font-normal leading-5"
          >
            Require Skills Assessment
          </Label>
          <Switch
            id="require-assessment"
            checked={isAssessment}
            onCheckedChange={onIsAssessmentChange}
          />
        </div>
      </div>

      {isAssessment && (
        <>
          {/* Assessment summary */}
          <Card className="border-0 bg-slate-100 shadow-none">
            <CardContent className="space-y-5 p-5 sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <CircleHelp className="size-7" />
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-blue-100 font-normal text-slate-600 hover:bg-blue-100">
                      Proctored & Timed
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {version}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight">
                    {assessmentTitle}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {assessmentDescription}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white"
                    onClick={onPreview}
                  >
                    <Eye className="mr-2 size-4" />
                    Preview
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white text-primary"
                    onClick={() => {
                      setIsEditing((previous) => !previous);
                      onChangeAssessment?.();
                    }}
                  >
                    <ArrowLeftRight className="mr-2 size-4" />
                    {isEditing ? "Done" : "Change"}
                  </Button>
                </div>
              </div>

              {/* Assessment metrics */}
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-white p-4 sm:grid-cols-4">
                <Metric
                  label="Duration"
                  icon={<Clock3 className="size-4" />}
                  value={`${assessment.durationMinutes} Minutes`}
                />
                <Metric
                  label="Format"
                  icon={<PanelsTopLeft className="size-4" />}
                  value={assessment.format}
                />
                <Metric
                  label="Total Weight"
                  icon={<CircleDollarSign className="size-4" />}
                  value={`${assessment.pointsTotal} Points`}
                />
                <Metric
                  label="Pass Benchmark"
                  icon={<Star className="size-4" />}
                  value={`${assessment.passingPercent}% (${Math.round(
                    (assessment.pointsTotal * assessment.passingPercent) / 100
                  )} Pts)`}
                  highlight
                />
              </div>

              {/* Editable settings */}
              {isEditing && (
                <div className="grid gap-4 rounded-xl border bg-white p-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                    <Input
                      id="durationMinutes"
                      type="number"
                      min={1}
                      value={assessment.durationMinutes}
                      onChange={(event) =>
                        update({
                          durationMinutes: Number(event.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessmentFormat">Format</Label>
                    <Input
                      id="assessmentFormat"
                      value={assessment.format}
                      onChange={(event) =>
                        update({ format: event.target.value })
                      }
                      placeholder="e.g. 2 challenges"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pointsTotal">Total points</Label>
                    <Input
                      id="pointsTotal"
                      type="number"
                      min={1}
                      value={assessment.pointsTotal}
                      onChange={(event) =>
                        update({ pointsTotal: Number(event.target.value) })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passingPercent">
                      Passing benchmark (%)
                    </Label>
                    <Input
                      id="passingPercent"
                      type="number"
                      min={0}
                      max={100}
                      value={assessment.passingPercent}
                      onChange={(event) =>
                        update({
                          passingPercent: Math.min(
                            100,
                            Math.max(0, Number(event.target.value))
                          ),
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automation information */}
          <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 p-5 text-primary">
            <Mail className="mt-0.5 size-5 shrink-0" />

            <div className="min-w-0 flex-1">
              <h4 className="font-semibold">Automated Trigger Execution</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {triggerDescription ??
                  "Send assessment automatically via invite email as soon as a candidate enters the Assessment stage. Candidate has 5 days to complete from issuance."}
              </p>
            </div>

            <Badge className="bg-primary text-white hover:bg-primary">
              Active
            </Badge>
          </div>
        </>
      )}
    </section>
  );
}

function Metric({
  label,
  icon,
  value,
  highlight = false,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div
        className={`flex items-center gap-1.5 text-sm font-semibold ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
