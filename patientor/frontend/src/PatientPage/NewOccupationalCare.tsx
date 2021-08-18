import React from "react";
import { Formik, Form, Field } from "formik";
import { OccupationalHealthcareEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button } from "semantic-ui-react";

type EntryType = Omit<OccupationalHealthcareEntry, "id">;

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
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={(values, actions) => {
        onSubmit(values as EntryType);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: {
          [field: string]: { [nested: string]: string } | string;
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
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (
          Boolean(values.sickLeave?.startDate) !==
          Boolean(values.sickLeave?.endDate)
        ) {
          errors.sickLeave = {
            startDate: requiredError,
            endDate: requiredError
          };
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
              name="employerName"
              label="Employer Name"
              placeholder="Employer Name"
              component={TextField}
            />
            <h3>Sick Leave</h3>
            <Field
              name="sickLeave.startDate"
              label="Start Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
            />
            <Field
              name="sickLeave.endDate"
              label="End Date"
              placeholder="YYYY-MM-DD"
              component={TextField}
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
