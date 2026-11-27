import { Form, Formik } from "formik";
import { useState } from "react";

export default function SetupPipelineStageAutomations() {
  const tabs = ["all_triggers", "ai_&_screening", "assessment", "interview"];
  const [activeTriggerTab, setactiveTriggerTab] = useState("all_triggers");
  const formData = {
    automations: [],
  };
  function handleSubmit(params: typeof formData) {}
  return (
    <div>
      <Formik initialValues={formData} onSubmit={handleSubmit}>
        {() => {
          return <Form></Form>;
        }}
      </Formik>
    </div>
  );
}
