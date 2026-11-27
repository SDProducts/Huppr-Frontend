/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  PartyPopper,
  Plus,
  Star,
} from "lucide-react";
import * as React from "react";

import { CreateEventDialog } from "@/app/dashboard/_components/CreateEventModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModal } from "@/context/modal.state";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type EventCategory =
  | "interviews"
  | "onboarding"
  | "leave"
  | "reviews"
  | "company";

type CalendarEvent = {
  id: number;
  day: number;
  title: string;
  category: EventCategory;
};

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const categories: {
  key: EventCategory;
  label: string;
  color: string;
}[] = [
  {
    key: "interviews",
    label: "Interviews",
    color: "bg-blue-600",
  },
  {
    key: "onboarding",
    label: "Onboarding",
    color: "bg-purple-500",
  },
  {
    key: "leave",
    label: "Team Leave",
    color: "bg-orange-500",
  },
  {
    key: "reviews",
    label: "Reviews",
    color: "bg-green-500",
  },
  {
    key: "company",
    label: "Company Events",
    color: "bg-pink-500",
  },
];

const events: CalendarEvent[] = [
  {
    id: 1,
    day: 1,
    title: "Hiring Sync",
    category: "interviews",
  },
  {
    id: 2,
    day: 1,
    title: "Leave: J. Doe",
    category: "leave",
  },
  {
    id: 3,
    day: 2,
    title: "Q4 Rev. Prep",
    category: "reviews",
  },
  {
    id: 4,
    day: 3,
    title: "Onboarding #4",
    category: "onboarding",
  },
  {
    id: 5,
    day: 3,
    title: "FE Dev Interview",
    category: "interviews",
  },
  {
    id: 6,
    day: 7,
    title: "Company Picnic",
    category: "company",
  },
  {
    id: 7,
    day: 8,
    title: "Senior UX Int.",
    category: "interviews",
  },
  {
    id: 8,
    day: 8,
    title: "Cohort Welcome",
    category: "onboarding",
  },
  {
    id: 9,
    day: 8,
    title: "Sarah Birthday",
    category: "company",
  },
  {
    id: 10,
    day: 9,
    title: "Leadership Syn.",
    category: "reviews",
  },
  {
    id: 11,
    day: 12,
    title: "M. Garcia (Sick)",
    category: "leave",
  },
];
interface HighlightsType {
  title: string;
  time: string;
  category: EventCategory;
}
const highlights: HighlightsType[] = [
  {
    title: "Senior UX Interview",
    time: "10:00 AM - 11:30 AM",
    category: "interviews",
  },
  {
    title: "New Cohort Welcome",
    time: "2:00 PM - 3:00 PM",
    category: "onboarding",
  },
  {
    title: "Birthday: Sarah Chen",
    time: "All Day",
    category: "company",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                  */
/* -------------------------------------------------------------------------- */

export default function CompanyCalendarPage() {
  const [view, setView] = React.useState<"Day" | "Week" | "Month">("Month");

  const [activeCategories, setActiveCategories] = React.useState<
    EventCategory[]
  >(categories.map((category) => category.key));

  const toggleCategory = (category: EventCategory) => {
    setActiveCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  const filteredEvents = events.filter((event) =>
    activeCategories.includes(event.category)
  );

  return (
    <div className="min-h-screen text-slate-950">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <CalendarHeader view={view} setView={setView} />

        {/* STATS */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ClipboardCheck}
            label="Pending Interviews"
            value="12"
            iconClass="bg-blue-100 text-blue-600"
          />

          <StatCard
            icon={PartyPopper}
            label="Work Anniversaries"
            value="4"
            iconClass="bg-purple-100 text-purple-600"
          />

          <StatCard
            icon={Clock3}
            label="On Leave Today"
            value="8"
            iconClass="bg-orange-100 text-orange-600"
          />

          <StatCard
            icon={Star}
            label="Performance Reviews"
            value="26"
            iconClass="bg-green-100 text-green-600"
          />
        </div>

        {/* CALENDAR AREA */}
        <div className="mt-7 grid gap-7 xl:grid-cols-[265px_minmax(0,1fr)]">
          {/* LEFT SIDEBAR */}
          <aside className="space-y-7">
            <MiniCalendar />

            <CategoryCard
              activeCategories={activeCategories}
              toggleCategory={toggleCategory}
            />

            <HighlightsCard />
          </aside>

          {/* MAIN CALENDAR */}
          <section className="min-w-0">
            {view === "Month" && <MonthCalendar events={filteredEvents} />}

            {view === "Week" && <WeekPlaceholder />}

            {view === "Day" && <DayPlaceholder />}
          </section>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

function CalendarHeader({
  view,
  setView,
}: {
  view: "Day" | "Week" | "Month";
  setView: React.Dispatch<React.SetStateAction<"Day" | "Week" | "Month">>;
}) {
  const modal = useModal();
  const openModal = () => {
    modal.open({
      title: "New Event",
      size: "sm:w-2xl",
      content: <CreateEventDialog />,
    });
  };
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Company Calendar
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage organization-wide events and team availability.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* VIEW SWITCHER */}
        <div className="flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          {(["Day", "Week", "Month"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition",
                view === item
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <Button
          onClick={openModal}
          className="h-11 bg-blue-600 px-5 shadow-sm hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT CARD                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  iconClass: string;
}) {
  return (
    <Card className="flex min-h-[128px] items-center gap-5 rounded-2xl border-slate-200 bg-white p-6 shadow-none">
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
          iconClass
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <p className="max-w-[130px] text-sm font-bold uppercase leading-5 tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* MINI CALENDAR                                                              */
/* -------------------------------------------------------------------------- */

function MiniCalendar() {
  const days = [
    ["M", "T", "W", "T", "F", "S", "S"],
    ["30", "1", "2", "3", "4", "5", "6"],
    ["7", "8", "9", "10", "11", "12", "13"],
    ["14", "15", "16", "17", "18", "19", "20"],
    ["21", "22", "23", "24", "25", "26", "27"],
    ["28", "29", "30", "31", "1", "2", "3"],
  ];

  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-none">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold">October 2024</h2>

        <div className="flex items-center gap-1">
          <button className="rounded-md p-1.5 hover:bg-slate-100">
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button className="rounded-md p-1.5 hover:bg-slate-100">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-y-2 text-center">
        {days.flat().map((day, index) => {
          const isHeader = index < 7;
          const isToday = day === "14" && !isHeader;
          const isMuted =
            (!isHeader && index === 7) ||
            (!isHeader && index >= 35) ||
            (day === "30" && index === 7);

          return (
            <div
              key={`${day}-${index}`}
              className={cn(
                "flex h-8 items-center justify-center text-xs",
                isHeader ? "font-semibold text-slate-500" : "text-slate-700",
                isMuted && "text-slate-300"
              )}
            >
              {isToday ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {day}
                </span>
              ) : (
                day
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                 */
/* -------------------------------------------------------------------------- */

function CategoryCard({
  activeCategories,
  toggleCategory,
}: {
  activeCategories: EventCategory[];
  toggleCategory: (category: EventCategory) => void;
}) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-none">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        Categories
      </h2>

      <div className="mt-5 space-y-4">
        {categories.map((category) => {
          const active = activeCategories.includes(category.key);

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => toggleCategory(category.key)}
              className="flex w-full items-center gap-3 text-left"
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded border text-white transition",
                  active
                    ? "border-blue-600 bg-blue-600"
                    : "border-slate-300 bg-white"
                )}
              >
                {active && (
                  <svg
                    viewBox="0 0 12 12"
                    className="h-3 w-3 fill-none stroke-current stroke-[2]"
                  >
                    <path d="m2 6 2.5 2.5L10 3" />
                  </svg>
                )}
              </span>

              <span className="flex-1 text-sm text-slate-600">
                {category.label}
              </span>

              <span
                className={cn("h-2.5 w-2.5 rounded-full", category.color)}
              />
            </button>
          );
        })}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* HIGHLIGHTS                                                                 */
/* -------------------------------------------------------------------------- */

function HighlightsCard() {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white p-6 shadow-none">
      <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
        Today's Highlights
      </h2>

      <div className="mt-5 space-y-4">
        {highlights.map((highlight) => (
          <HighlightItem key={highlight.title} {...highlight} />
        ))}
      </div>

      <button className="mt-5 w-full text-center text-sm font-semibold text-blue-600 hover:text-blue-700">
        View all events
      </button>
    </Card>
  );
}

function HighlightItem({
  title,
  time,
  category,
}: {
  title: string;
  time: string;
  category: EventCategory;
}) {
  const styles = {
    interviews: "border-blue-600 bg-blue-50 text-blue-900",
    onboarding: "border-purple-500 bg-purple-50 text-purple-900",
    company: "border-pink-500 bg-pink-50 text-pink-900",
    leave: "border-orange-500 bg-orange-50 text-orange-900",
    reviews: "border-green-500 bg-green-50 text-green-900",
  };

  const timeStyles = {
    interviews: "text-blue-500",
    onboarding: "text-purple-500",
    company: "text-pink-500",
    leave: "text-orange-500",
    reviews: "text-green-500",
  };

  return (
    <div className={cn("rounded-xl border-l-4 px-4 py-4", styles[category])}>
      <p className="text-sm font-bold">{title}</p>

      <p className={cn("mt-1 text-xs font-medium", timeStyles[category])}>
        {time}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MONTH CALENDAR                                                             */
/* -------------------------------------------------------------------------- */

function MonthCalendar({ events }: { events: CalendarEvent[] }) {
  const weeks = [
    [
      { day: 30, muted: true },
      { day: 1 },
      { day: 2 },
      { day: 3 },
      { day: 4 },
      { day: 5, muted: true },
      { day: 6, muted: true },
    ],
    [
      { day: 7 },
      { day: 8 },
      { day: 9 },
      { day: 10 },
      { day: 11 },
      { day: 12 },
      { day: 13, muted: true },
    ],
    [
      { day: 14, today: true },
      { day: 15 },
      { day: 16 },
      { day: 17 },
      { day: 18 },
      { day: 19, muted: true },
      { day: 20, muted: true },
    ],
    [
      { day: 21 },
      { day: 22 },
      { day: 23 },
      { day: 24 },
      { day: 25 },
      { day: 26, muted: true },
      { day: 27 },
    ],
    [
      { day: 28 },
      { day: 29 },
      { day: 30 },
      { day: 31 },
      { day: 1, muted: true },
      { day: 2, muted: true },
      { day: 3, muted: true },
    ],
  ];

  return (
    <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-none">
      {/* WEEKDAYS */}
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div
            key={day}
            className="flex h-16 items-center justify-center text-sm font-semibold text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* WEEKS */}
      <div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((date, dayIndex) => {
              const dayEvents = events.filter(
                (event) => event.day === date.day && !date.muted
              );

              return (
                <CalendarCell
                  key={`${weekIndex}-${dayIndex}`}
                  date={date}
                  events={dayEvents}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* CALENDAR CELL                                                              */
/* -------------------------------------------------------------------------- */

function CalendarCell({
  date,
  events,
}: {
  date: {
    day: number;
    muted?: boolean;
    today?: boolean;
  };
  events: CalendarEvent[];
}) {
  return (
    <div
      className={cn(
        "min-h-[150px] border-b border-r border-slate-200 p-3",
        "last:border-r-0",
        date.muted && "bg-slate-50/70"
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-sm font-medium",
            date.muted ? "text-slate-300" : "text-slate-800",
            date.today && "font-bold text-blue-600"
          )}
        >
          {date.day}
        </span>

        {date.today && (
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        {events.map((event) => (
          <EventPill
            key={event.id}
            title={event.title}
            category={event.category}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EVENT PILL                                                                 */
/* -------------------------------------------------------------------------- */

function EventPill({
  title,
  category,
}: {
  title: string;
  category: EventCategory;
}) {
  const styles = {
    interviews: "border-l-blue-500 bg-blue-100 text-blue-700",
    onboarding: "border-l-purple-500 bg-purple-100 text-purple-700",
    leave: "border-l-orange-500 bg-orange-100 text-orange-700",
    reviews: "border-l-green-500 bg-green-100 text-green-700",
    company: "border-l-pink-500 bg-pink-100 text-pink-700",
  };

  return (
    <div
      className={cn(
        "truncate rounded-md border-l-2 px-2.5 py-1.5 text-[11px] font-semibold",
        styles[category]
      )}
    >
      {title}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* WEEK VIEW                                                                  */
/* -------------------------------------------------------------------------- */

function WeekPlaceholder() {
  return (
    <Card className="flex min-h-[750px] items-center justify-center rounded-2xl border-slate-200 bg-white shadow-none">
      <div className="text-center">
        <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

        <h2 className="mt-4 text-lg font-bold">Week View</h2>

        <p className="mt-1 text-sm text-slate-500">
          Your weekly calendar view can be rendered here.
        </p>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* DAY VIEW                                                                   */
/* -------------------------------------------------------------------------- */

function DayPlaceholder() {
  return (
    <Card className="flex min-h-[750px] items-center justify-center rounded-2xl border-slate-200 bg-white shadow-none">
      <div className="text-center">
        <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />

        <h2 className="mt-4 text-lg font-bold">Day View</h2>

        <p className="mt-1 text-sm text-slate-500">
          Your daily calendar view can be rendered here.
        </p>
      </div>
    </Card>
  );
}
