"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { useUpdatePassword } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setshowPassword] = useState(false);
  const { mutate: changePassword, isPending } = useUpdatePassword();
  const router = useRouter();
  const togglePassword = () => {
    setshowPassword(!showPassword);
  };
  const initialValues = {
    password: "",
  };
  const handleForgotPassword = async (values: typeof initialValues) => {
    changePassword(values);
    router.push("/auth/login");
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="space-y-10">
        <div>
          <h2 className="text-[clamp(1.5rem,2cqi+0.025rem,2rem)] font-semibold tracking-normal ">
            Reset Your Password
          </h2>
          <p className="text-sm">Please enter your new password below.</p>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validateOnMount
            onSubmit={handleForgotPassword}
          >
            {() => (
              <Form className="flex flex-col gap-6">
                <Input
                  label="New Password"
                  name="password"
                  placeholder="New password"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    showPassword ? (
                      <EyeOff size={18} onClick={togglePassword} />
                    ) : (
                      <Eye size={18} onClick={togglePassword} />
                    )
                  }
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Saving..." : "Save New Password"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
