import Input from "@/components/form/Input";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { Form, Formik } from "formik";
import { Info, XCircle } from "lucide-react";

export const ApproveRequest = () => {
  return <div>LeaveRequestActionModals</div>;
};
export const DeclineRequest = () => {
  const modal = useModal();
  const initialValues = {
    reason: "",
  };
  const submit = () => {};
  return (
    <div className="space-y-7 px-7 pb-7">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center h-10 w-10 bg-red-100 text-red-500 rounded-md">
          <XCircle />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-xl">Decline Request</div>
          <p>
            Please provide a reason for declining this request. This message
            will be shared directly with the employee.
          </p>
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {() => (
          <Form className="space-y-4">
            <Input
              label="Reason for Decline"
              name="reason"
              type="textarea"
              placeholder="Type your reasoon here..."
            />
            <div className="flex items-start gap-2 bg-blue-100 rounded-md p-2">
              <Info />
              <div className="flex-1 text-sm">
                Declining this request is permanent. If you need more
                information fro the employee first, consider sending a message
                instead.
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                label="Cancel"
                onClick={modal.close}
                className="w-fit! bg-transparent! text-gray-700!"
              />
              <Button
                label="Decline Request"
                className="bg-red-500 text-white w-fit!"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
