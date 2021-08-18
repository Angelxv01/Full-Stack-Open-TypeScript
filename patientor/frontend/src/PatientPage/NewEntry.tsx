import React from "react";
import { Formik, Form, Field } from "formik";
import { FormBaseEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button } from "semantic-ui-react";

interface Props {
  onSubmit: (values: FormBaseEntry) => void;
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
        diagnosisCodes: []
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
            <DiagnosisSelection
              diagnoses={diagnosis}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
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
