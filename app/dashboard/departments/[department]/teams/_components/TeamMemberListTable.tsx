"use client";
import Input from "@/components/form/Input";
import Button from "@/components/ui/CustomButton";
import { Separator } from "@/components/ui/separator";
import { useGetTeamMembers } from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import { Search, SlidersHorizontal } from "lucide-react";
import { useParams } from "next/navigation";

const TeamMemberListTable = () => {
  const { teamId } = useParams();
  const { data, isLoading } = useGetTeamMembers(teamId?.toString());
  //   const projects = data?.items || [];
  //   // Priority style lookup mapping
  //   const priorityStyles: Record<string, string> = {
  //     low: "bg-blue-100 text-blue-700 border-blue-200",
  //     medium: "bg-amber-100 text-amber-700 border-amber-200",
  //     high: "bg-red-100 text-red-700 border-red-200",
  //     urgent: "bg-rose-100 text-rose-800 border-rose-300 font-semibold",
  //   };

  //   // Helper component for Priority Pill
  //   const PriorityPill = ({ priority }: { priority: string }) => {
  //     const normalizedPriority = priority?.toLowerCase() || "";
  //     const styles =
  //       priorityStyles[normalizedPriority] ||
  //       "bg-gray-100 text-gray-700 border-gray-200";

  //     return (
  //       <span
  //         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize fit-content ${styles}`}
  //       >
  //         {priority}
  //       </span>
  //     );
  //   };
  //   function projectList() {
  //     if (isLoading) {
  //       return <ProjectListTableSkeleton />;
  //     }
  //     if (projects.length < 5) {
  //       return <ActivityEmptyState title="No projects found" />;
  //     }
  //     return (
  //       <div className="space-y-0 divide-y divide-gray-200 py-2">
  //         {projects.map((project, i) => (
  //           <div
  //             key={i}
  //             className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr] py-2 gap-2"
  //           >
  //             <div className="line-clamp-2" title={project.name}>
  //               {project.name}
  //             </div>
  //             <div className="">
  //               <PriorityPill priority={project.priority} />
  //             </div>
  //             <Progress indicatorClassName="py-2" value={10} />
  //             <div className="">{project.resourceManager.displayName}</div>
  //             <div className="">{project.status}</div>
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   }
  return (
    <div className="bg-white p-10 rounded-lg space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Team Directory</h2>
        <div className="w-1/2">
          <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
            {() => {
              return (
                <Form className="flex items-center gap-2">
                  <Input
                    name="search"
                    icon={<Search size={16} />}
                    placeholder="Search members..."
                  />
                  <Button
                    label="Filter"
                    icon={<SlidersHorizontal size={16} />}
                    className="w-fit! px-2 bg-white! text-primary! border"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] uppercase py-2 gap-2">
          <div className="">Employee</div>
          <div className="">Role</div>
          <div className="">team</div>
          <div className="">location</div>
          <div className="">Status</div>
        </div>
        <Separator />
        {/* <div className="">{projectList()}</div> */}
      </div>
    </div>
  );
};

export default TeamMemberListTable;
