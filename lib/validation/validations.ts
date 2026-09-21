import * as yup from "yup";

export const createSubTeamSchema = yup.object({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
});
