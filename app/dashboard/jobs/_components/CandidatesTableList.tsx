import EditCandidate from "@/app/dashboard/jobs/_components/EditCandidate";
import Input from "@/components/form/Input";
import SearchableSelect from "@/components/form/SearchableSelect";
import { TableRowSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskStatusPill } from "@/components/utils/Pills";
import { useModal } from "@/context/modal.state";

import { useGetCandidates, useGetJobStages } from "@/hooks/employer/useJobs";
import { cn, getDate, getInitials } from "@/lib/utils";
import { Form, Formik } from "formik";
import {
  Eye,
  MoreHorizontal,
  Pen,
  Search,
  SlidersHorizontal,
  Trash2,
  Waypoints,
} from "lucide-react";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function CandidatesTableList() {
  const { jobId } = useParams();
  const modal = useModal();
  const [filterParams, setfilterParams] = useState<candidatesFilters>({
    jobId: String(jobId),
  });
  const { data, isLoading } = useGetCandidates(filterParams);
  const { data: stagesData } = useGetJobStages(String(jobId));
  const stageOptions = stagesData?.items.map((item) => ({
    label: item.name,
    subText: item.description || "...",
    icon: (
      <div className="size-7 flex items-center justify-center rounded-sm bg-primary/10 text-primary">
        <Waypoints className="size-4" />
      </div>
    ),
    value: item.id,
  }));

  const candidates = data?.items || [];
  const statusOption = [
    { label: "All", value: "" },
    { label: "In Review", value: "in_review" },
    { label: "Assessment", value: "assessment" },
    { label: "Interview", value: "interview" },
    { label: "Offer", value: "offer" },
    { label: "Hired", value: "hired" },
    { label: "Rejected", value: "rejected" },
  ];
  const formData: candidatesFilters = {
    search: "",
    status: undefined,
    stageId: "",
  };

  function handleFilter(params: typeof formData) {
    setfilterParams({
      jobId: String(jobId),
      ...params,
    });
  }
  function handleEditCandidate(params: Candidate) {
    modal.open({
      content: <EditCandidate candidate={params} />,
      size: "md:w-xl",
      bgColor: "bg-slate-100",
      headerColor: "bg-primary-heading",
      header: (
        <div className="">
          <h2 className="text-2xl font-bold text-white">Edit Candidate Data</h2>
          <p className="text-sm text-white">
            Add new candidates, select recruitment stage and professional info.{" "}
          </p>
        </div>
      ),
    });
  }
  return (
    <div className="bg-white p-6 rounded-2xl space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Applicants ({candidates.length})</h2>
        <div className="">
          <Formik initialValues={formData} onSubmit={handleFilter}>
            {() => {
              return (
                <Form className="flex flex-col sm:flex-row gap-2 sm:items-center justify-between">
                  <Input
                    name="search"
                    placeholder="Search candidates..."
                    icon={<Search className="size-4" />}
                    className="max-w-100 h-10"
                  />
                  <div className="flex items-center gap-2">
                    <SearchableSelect
                      name="status"
                      options={statusOption}
                      placeholder="Filter by status"
                      className="h-10"
                    />
                    <SearchableSelect
                      name="stageId"
                      options={stageOptions || []}
                      placeholder="Filter by stage"
                      className="h-10"
                    />
                    <Button type="submit" className={cn("h-10 py-1 px-4")}>
                      <SlidersHorizontal className="size-4" />
                      <span className="hidden sm:block">Filter</span>
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="">
        <Table>
          <TableCaption>
            A list of candidates who applied for this position.
          </TableCaption>
          <TableHeader className="">
            <TableRow className="hidden sm:table-row">
              <TableHead className="font-bold">Candidate</TableHead>
              <TableHead className="font-bold">Role</TableHead>
              <TableHead className="font-bold">Match Score</TableHead>
              <TableHead className="font-bold">Stage</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Applied on</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          {isLoading && (
            <>
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </>
          )}
          <TableBody>
            {candidates.map((c) => (
              <TableRow className="" key={c.id}>
                <TableCell>
                  <div
                    onClick={() => handleEditCandidate(c)}
                    // href={`/dashboard/candidates/${c.id}`}
                    className="flex items-center gap-2"
                  >
                    <div className="size-8 flex justify-center items-center bg-primary/10 border-primary/20 rounded-full text-xs p-1">
                      {getInitials(c.fullName)}
                    </div>
                    <div className="">
                      <div className="font-semibold">{c.fullName}</div>
                      <div className="text-xs">{c.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{c.jobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Progress
                        indicatorClassName={cn(
                          c.matchScore >= 80
                            ? "bg-green-500"
                            : c.matchScore <= 35
                            ? "bg-red-500"
                            : c.matchScore <= 49
                            ? "bg-yellow-500"
                            : ""
                        )}
                        value={c.matchScore}
                      />
                    </div>
                    <div className="text-xs">{c.matchScore}%</div>
                  </div>
                </TableCell>
                <TableCell>
                  <TaskStatusPill status={c.stageName} />
                </TableCell>
                <TableCell>
                  <TaskStatusPill status={c.status} />
                </TableCell>
                <TableCell>{getDate(c.appliedAt)}</TableCell>
                <TableCell className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={
                        "p-2 rounded-lg cursor-pointer text-slate-500 hover:bg-gray-200"
                      }
                    >
                      <div className="">
                        <MoreHorizontal className="h-4 w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={cn("min-w-50")}>
                      <DropdownMenuItem
                        onClick={() => handleEditCandidate(c)}
                        className={cn(
                          "hover:bg-primary-100! hover:text-primary!"
                        )}
                      >
                        <div
                          // href={`/dashboard/candidates/${c.id}`}
                          className="flex items-center gap-2 w-full"
                        >
                          <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-sm">
                            <Eye className="size-3" />
                          </div>
                          <div className="flex-1">View</div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditCandidate(c)}
                        className={cn(
                          "hover:bg-primary-100! hover:text-primary!"
                        )}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <div className="h-6 w-6 bg-primary-100 flex justify-center items-center rounded-sm">
                            <Pen className="size-3" />
                          </div>
                          <div className="flex-1">Edit</div>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className={cn(
                          "hover:bg-red-100! text-red-500! hover:text-red-500! flex items-center gap-1"
                        )}
                      >
                        <div className="h-6 w-6 bg-red-100 flex justify-center items-center rounded-sm">
                          <Trash2 className="size-3" />
                        </div>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
