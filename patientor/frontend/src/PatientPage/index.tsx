import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon, Container, Button } from "semantic-ui-react";

import { Entry, EntryWithoutId, Gender, Patient } from "../types";
import { addEntry, patientInfo, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import EntrySection from "./Entry";
import NewHospital from "./NewHospital";
import NewHealthCheck from "./NewHealthCheck";
import NewOccupationalCare from "./NewOccupationalCare";

const types: Array<Entry["type"]> = [
  "HealthCheck",
  "Hospital",
  "OccupationalHealthcare"
];

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const index = () => {
  const { id } = useParams<{ id: string }>();
  // const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [{ patients }, dispatch] = useStateValue();
  const [type, setType] = React.useState<Entry["type"]>(types[0]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
    } catch (err) {
      console.error(err.response?.data || "Unknown Error");
    }
  };

  React.useEffect(() => {
    const fetched = patients[id]?.ssn;
    if (fetched) {
      return;
    }

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `http://localhost:3001/api/patients/${id}`
        );
        dispatch(patientInfo(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [id]);

  // gender icon style
  const genderName =
    patients[id]?.gender === Gender.Other
      ? "genderless"
      : patients[id]?.gender === Gender.Male
      ? "mars"
      : "venus";

  const form = () => {
    switch (type) {
      case "HealthCheck":
        return <NewHealthCheck onSubmit={submitNewEntry} />;
      case "Hospital":
        return <NewHospital onSubmit={submitNewEntry} />;
      case "OccupationalHealthcare":
        return <NewOccupationalCare onSubmit={submitNewEntry} />;
      default:
        assertNever(type);
    }
  };

  return (
    <div className="App">
      <Header as="h1">
        <Container>
          {patients[id]?.name}
          <Icon name={genderName} />
        </Container>
      </Header>
      <Container>ssn: {patients[id]?.ssn}</Container>
      <Container>occupation: {patients[id]?.occupation}</Container>
      <Header as="h3">entries</Header>
      {patients[id]?.entries.map((entry) => (
        <EntrySection entry={entry} key={entry.id} />
      ))}
      {types.map((type) => (
        <Button key={type} onClick={() => setType(type)}>
          {type}
        </Button>
      ))}
      {form()}
    </div>
  );
};

// doctor stethoscope heart

export default index;
