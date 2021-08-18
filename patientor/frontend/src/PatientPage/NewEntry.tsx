import React from "react";
import { Formik, Form, Field } from "formik";
import { EntryWithoutId } from "../types";
import {
  TextField,
  DiagnosisSelection,
  NumberField
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button } from "semantic-ui-react";

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  // onCancel: () => void;
}

const NewEntry = ({ onSubmit }: Props) => {
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
      onSubmit={onSubmit}
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
            <Field
              diagnoses={diagnosis}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
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

export default NewEntry;
