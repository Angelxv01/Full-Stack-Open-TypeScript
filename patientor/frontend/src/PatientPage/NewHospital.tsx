import React from "react";
import { Formik, Form, Field } from "formik";
import { HospitalEntry } from "../types";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { Button } from "semantic-ui-react";

interface BaseProps {
  onCancel?: () => void;
}
interface HCProps extends BaseProps {
  onSubmit: (values: Omit<HospitalEntry, "id">) => void;
}

const Entry = ({ onSubmit }: HCProps) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
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
        if (!values.discharge.criteria) {
          errors.discharge = {
            criteria: requiredError
          };
        }
        if (!values.discharge.date) {
          errors.discharge = {
            date: requiredError
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
            <Field
              diagnoses={diagnosis}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              component={DiagnosisSelection}
            />
            <h2>Discharge</h2>
            <Field
              name="discharge.criteria"
              label="Criteria"
              placeholder="Discharge Criteria"
              component={TextField}
            />
            <Field
              name="discharge.date"
              label="Date"
              placeholder="Discharge Date"
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
