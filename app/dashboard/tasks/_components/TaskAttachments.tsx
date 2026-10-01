"use client";
import UploadAttachment from "@/app/dashboard/tasks/_components/UploadAttachment";
import ConfirmDelete from "@/components/global/ConfirmDelete";
import { useModal } from "@/context/modal.state";
import { useGetTaskAttachemnts } from "@/hooks/employer/useDepartment";
import { formatFileSizeMB, getFileDisplayType } from "@/lib/utils";
import { FileText, Paperclip, PlusCircle, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";

const TaskAttachments = () => {
  const { taskId } = useParams();
  const modal = useModal();
  const { data, isLoading } = useGetTaskAttachemnts(String(taskId));
  const openAttchmentModal = () => {
    modal.open({
      content: <UploadAttachment />,
      size: "sm:w-md",
    });
  };
  const deleteAttachment = (attachmentId: string) => {
    modal.open({
      content: (
        <ConfirmDelete
          queries={["task-attachments", "task"]}
          api_path={`organization/tasks/${taskId}/attachments/${attachmentId}`}
          action="File"
        />
      ),
      size: "sm:w-sm",
    });
  };
  const files = data?.items || [];
  return (
    <div className="p-4 sm:p-8 bg-white rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paperclip />
          <h2 className="text-2xl font-bold">Attachments</h2>
        </div>
        <div
          onClick={openAttchmentModal}
          className="flex items-center gap-1 text-primary text-sm cursor-pointer"
        >
          <PlusCircle className="size-3.5" />
          <div className="">Add</div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {files.map((file, i) => (
          <div className="flex justify-between items-start gap-2 py-2" key={i}>
            <div className="flex items-center gap-2 flex-1">
              <div className="p-2 bg-primary/5 rounded-md flex justify-center items-center">
                <FileText className="size-6" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold line-clamp-1">
                  {file.fileName}
                </div>
                <div className="text-xs text-gray-500">
                  {getFileDisplayType(file.contentType)} ●{" "}
                  {formatFileSizeMB(file.fileSize)}
                </div>
              </div>
            </div>
            <div
              onClick={() => deleteAttachment(file.id)}
              className="py-1 cursor-pointer text-red-500 rounded-md flex justify-center items-center"
            >
              <Trash2 className="size-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskAttachments;
