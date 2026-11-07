import Input from "@/components/form/Input";
import Button from "@/components/ui/CustomButton";
import { initialvalues } from "@/data/constants";
import {
  useAddNoteToTask,
  useGetTaskNotes,
} from "@/hooks/employer/useDepartment";
import { getShortDate } from "@/lib/utils";
import { Form, Formik } from "formik";
import React from "react";
interface Prop {
  taskId: string;
}
const AddTaskNote: React.FC<Prop> = ({ taskId }) => {
  const { data, isLoading } = useGetTaskNotes(taskId);
  const { mutate: addNote, isPending } = useAddNoteToTask(taskId);
  const notes = data?.items || [];
  const submit = (values: typeof initialvalues.addTaskNote) => {
    addNote(values);
  };
  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Note</h2>
        <div className="text-sm">{notes.length} Notes</div>
      </div>

      <div className="space-y-2">
        {notes.map((note, i) => (
          <div className="space-y-2 bg-primary/5 p-4 rounded-lg" key={i}>
            <div className="flex justify-between items-center">
              <div className="font-bold">{note.author.email}</div>
              <div className="text-sm">{getShortDate(note.createdAt)}</div>
            </div>
            <p className="text-sm">{note.body}</p>
          </div>
        ))}
      </div>
      <Formik initialValues={initialvalues.addTaskNote} onSubmit={submit}>
        {() => {
          return (
            <Form className="space-y-2">
              <Input placeholder="Add a note" name="body" type="textarea" />
              <div className="flex justify-end">
                <Button
                  label="Add Note"
                  type="submit"
                  className="w-fit! px-4"
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

export default AddTaskNote;
