import React from "react";
import { Formik, Form, Field } from "formik";
import { HealthCheckEntry } from "../types";
import {
  TextField,
  DiagnosisSelection,
  NumberField
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button } from "semantic-ui-react";

type EntryType = Omit<HealthCheckEntry, "id">;
interface Props {
  onSubmit: (values: EntryType) => void;
}

const Entry = ({ onSubmit }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        type: "HealthCheck"
      }}
      onSubmit={(values, actions) => {
        onSubmit(values as EntryType);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating > 3 || values.healthCheckRating < 0) {
          errors.healthCheckRating = "Field is invalid";
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              name="description"
              label="Description"
              placeholder="Exhaustive description of patient situation"
              component={TextField}
            />
            <Field
              name="specialist"
              label="Specialist"
              placeholder="Specialist Name"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              name="healthCheckRating"
              label="Health Check Rating"
              min={0}
              max={3}
              component={NumberField}
            />
            <Button
              type="submit"
              floated="right"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Entry;
