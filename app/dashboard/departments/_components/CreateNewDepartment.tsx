import Input from "@/components/form/Input";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { useModal } from "@/context/modal.state";
import { useCreateNewDepartment } from "@/hooks/employer/useDepartment";
import { useGetDepartmentIcons } from "@/hooks/references/useReferences";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Check, Loader } from "lucide-react";

const CreateNewDepartment = () => {
  const modal = useModal();
  const { data: iconsData, isLoading: loadingIcons } = useGetDepartmentIcons();
  const { mutate: createNewDepartment, isPending } = useCreateNewDepartment();
  const icons = iconsData?.items || [];

  const initialValues = {
    name: "",
    description: "",
    iconId: "",
  };
  const submit = (values: typeof initialValues) => {
    createNewDepartment(values, {
      onSuccess() {
        modal.close();
      },
    });
  };
  return (
    <div className="sm:px-4 space-y-4">
      <div className="">
        <div className="text-2xl font-bold">Create New Department</div>
        <div className="text-sm">
          Input department name, description and select prefered icon.
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <div className="grid sm:grid-cols-[2fr_1fr] gap-2">
                <div className="order-2 sm:order-1 flex flex-col justify-between gap-4">
                  <div className="bg-white rounded-md p-4 space-y-4 ">
                    <Input
                      label="Name"
                      name="name"
                      placeholder="e.g. Engineering"
                      LabelClassName="text-sm"
                    />
                    <Input
                      label="Description"
                      name="description"
                      type="textarea"
                      rows={2}
                      LabelClassName="text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between bg-white p-2 rounded-md">
                    <Button
                      label="Back"
                      icon={<ArrowLeft />}
                      className="w-fit! px-0 bg-transparent text-gray-500!"
                    />
                    <div className="flex items-center gap-2">
                      <Button
                        label="Continue"
                        type="submit"
                        disabled={isPending}
                        isLoading={isPending}
                        rightIcon={<ArrowRight />}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-md p-2 space-y-2 order-1 sm:order-2">
                  <div className="leading-3.5">
                    <div className="font-semibold">Select Icon</div>
                    <div className="text-xs">select the prefered icon</div>
                  </div>
                  {loadingIcons ? (
                    <div className="flex-1 text-xs text-gray-500 flex flex-col items-center justify-center h-full">
                      <Loader className=" animate-spin" />
                      <div className="animate-pulse">Loading icons...</div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {icons.map((icon, i) => (
                        <Avatar
                          key={i}
                          className={cn("p-2 cursor-pointer")}
                          size="lg"
                          title={icon.name}
                          onClick={() => setFieldValue("iconId", icon.id)}
                        >
                          <AvatarImage
                            src={icon.url}
                            alt={icon.name}
                            className={cn("h-full w-full object-contain")}
                          />
                          {values.iconId === icon.id && (
                            <AvatarBadge className="h-4! w-4!">
                              <Check strokeWidth={7} />
                            </AvatarBadge>
                          )}
                          <AvatarFallback>
                            <span className="truncate">{icon.name}</span>
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateNewDepartment;
