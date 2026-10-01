"use client";
import FileUpload from "@/components/form/FileUpload";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { initialvalues } from "@/data/constants";
import { useAttachTaskFiles } from "@/hooks/employer/useDepartment";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";
const UploadAttachment = () => {
  const { taskId } = useParams();
  const modal = useModal();
  const { mutate: attachFiles, isPending } = useAttachTaskFiles(String(taskId));
  const submit = (values: typeof initialvalues.uploadTaskAttachment) => {
    attachFiles(values, {
      onSuccess() {
        modal.close();
      },
    });
  };
  return (
    <div className="px-4">
      <Formik
        initialValues={initialvalues.uploadTaskAttachment}
        onSubmit={submit}
      >
        {() => {
          return (
            <Form className="">
              <FileUpload name="file" label="Uplaod Attachment" />

              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button
                  label="Cancel"
                  className="bg-gray-200! text-black!"
                  onClick={modal.close}
                />
                <Button
                  label="Attach Files"
                  type="submit"
                  isLoading={isPending}
                  disabled={isPending}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UploadAttachment;
