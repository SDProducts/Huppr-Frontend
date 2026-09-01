// app/auth/signup/validation.ts (or wherever you keep your schemas)
import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  // ),
});
export const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  // ),

  // confirm_password: yup
  //   .string()
  //   .required("Please confirm your password")
  //   .oneOf([yup.ref("password")], "Passwords must match"),

  role: yup
    .string()
    .oneOf(["employer", "job_seeker"], "Invalid role selected")
    .required("Role is required"),
});
export const ForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .matches(/^\d+$/, "Verification code must contain only numbers"),
});
export const RoleSchema = yup.object({
  role: yup
    .string()
    .oneOf(["employer", "job_seeker"], "Invalid role selected")
    .required("Role is required"),
});

// Type inference for use with Formik
export type SignUpFormValues = yup.InferType<typeof signUpSchema>;
