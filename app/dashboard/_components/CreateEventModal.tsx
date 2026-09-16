"use client";

import {
  CalendarDays,
  Clock3,
  Link as LinkIcon,
  List,
  ListOrdered,
  MapPin,
  Video,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type EventType =
  | "Interview"
  | "Onboarding"
  | "Leave"
  | "Team Meeting"
  | "Public Holiday";

const eventTypes: EventType[] = [
  "Interview",
  "Onboarding",
  "Leave",
  "Team Meeting",
  "Public Holiday",
];

export function CreateEventDialog() {
  const [eventType, setEventType] = React.useState<EventType>("Team Meeting");

  const [form, setForm] = React.useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    description: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    const event = {
      ...form,
      type: eventType,
    };

    console.log("Create event:", event);
  };

  return (
    <div className="flex max-h-[95vh] flex-col gap-0 overflow-hidden">
      {/* BODY */}
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-7 sm:px-10 sm:py-9">
        <div className="space-y-8">
          {/* EVENT TITLE */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-slate-700">
              Event Title
            </Label>

            <Input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g. Q3 Performance Review"
              className="h-[68px] rounded-xl border-slate-200 px-5 text-base shadow-none placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500 sm:text-lg"
            />
          </div>

          {/* EVENT TYPE */}
          <div className="space-y-4">
            <Label className="text-base font-medium text-slate-700">
              Event Type
            </Label>

            <div className="flex flex-wrap gap-3">
              {eventTypes.map((type) => {
                const active = eventType === type;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-base font-medium transition",
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* START / END */}
          <div className="grid gap-6 lg:grid-cols-2">
            <DateTimeField
              label="Start"
              date={form.startDate}
              time={form.startTime}
              onDateChange={(value) => updateField("startDate", value)}
              onTimeChange={(value) => updateField("startTime", value)}
            />

            <DateTimeField
              label="End"
              date={form.endDate}
              time={form.endTime}
              onDateChange={(value) => updateField("endDate", value)}
              onTimeChange={(value) => updateField("endTime", value)}
            />
          </div>

          {/* LOCATION */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-slate-700">
              Location or Link
            </Label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Conference Room A or Meeting Link"
                  className="h-[68px] rounded-xl border-slate-200 pl-14 text-base shadow-none placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                className="h-[68px] shrink-0 rounded-xl bg-blue-50 px-6 text-base font-medium text-blue-600 hover:bg-blue-100"
                onClick={() =>
                  updateField("location", "https://zoom.us/j/your-meeting-id")
                }
              >
                <Video className="mr-3 h-5 w-5" />
                Add Zoom
              </Button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-slate-700">
              Description
            </Label>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              {/* TOOLBAR */}
              <div className="flex h-[68px] items-center gap-1 border-b border-slate-200 bg-slate-50 px-5">
                <button
                  type="button"
                  className="rounded p-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
                >
                  B
                </button>

                <button
                  type="button"
                  className="rounded p-2 font-serif text-sm italic text-slate-600 hover:bg-slate-200"
                >
                  I
                </button>

                <button
                  type="button"
                  className="rounded p-2 text-sm font-medium text-slate-600 underline hover:bg-slate-200"
                >
                  U
                </button>

                <span className="mx-2 h-6 w-px bg-slate-300" />

                <button
                  type="button"
                  className="rounded p-2 text-slate-600 hover:bg-slate-200"
                >
                  <List className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="rounded p-2 text-slate-600 hover:bg-slate-200"
                >
                  <ListOrdered className="h-4 w-4" />
                </button>

                <span className="mx-2 h-6 w-px bg-slate-300" />

                <button
                  type="button"
                  className="rounded p-2 text-slate-600 hover:bg-slate-200"
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>

              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Add meeting agenda or notes..."
                className="min-h-[190px] w-full resize-none border-0 px-5 py-5 text-base text-slate-700 outline-none placeholder:text-slate-300 focus:ring-0"
              />
            </div>
          </div>

          {/* OPTIONAL EXTRA SECTION */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-500">
              Add attendees, reminders, and additional event settings here.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-10 sm:py-6">
        <Button
          type="button"
          variant="ghost"
          className="h-12 rounded-lg px-6 text-base font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={handleCreate}
          className="h-12 rounded-lg bg-blue-600 px-8 text-base font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Create Event
        </Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DATE / TIME FIELD                                                          */
/* -------------------------------------------------------------------------- */

function DateTimeField({
  label,
  date,
  time,
  onDateChange,
  onTimeChange,
}: {
  label: string;
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium text-slate-700">{label}</Label>

      <div className="flex gap-3">
        <div className="relative min-w-0 flex-1">
          <CalendarDays className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />

          <Input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="h-[68px] min-w-0 rounded-xl border-slate-200 pl-14 pr-3 text-base shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>

        <div className="relative w-[155px] shrink-0">
          <Clock3 className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-600" />

          <Input
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="h-[68px] rounded-xl border-slate-200 pl-14 pr-2 text-base shadow-none focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
