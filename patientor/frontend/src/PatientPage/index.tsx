import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon, Container } from "semantic-ui-react";
import { Entry, EntryWithoutId, Gender, Patient } from "../types";
// Entry
import { patientInfo, useStateValue } from "../state";
// addEntry,
import { apiBaseUrl } from "../constants";
import EntryPage from "./Entry";
import NewHospital from "./NewHospital";

const index = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [{ patients }, dispatch] = useStateValue();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      // const { data: newEntry } =
      await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
      // dispatch(addEntry(id, newEntry));
      void fetchPatient();
    } catch (err) {
      console.error(err.response?.data || "Unknown Error");
    }
  };

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `http://localhost:3001/api/patients/${id}`
      );
      dispatch(patientInfo(patientFromApi));
      return setPatient(patientFromApi);
    } catch (e) {
      console.error(e);
      return;
    }
  };

  React.useEffect(() => {
    const fetched = patients[id]?.ssn;
    if (fetched) {
      return setPatient(patients[id]);
    }
    void fetchPatient();
  }, [id]);

  // gender icon style
  const genderName =
    patient?.gender === Gender.Other
      ? "genderless"
      : patient?.gender === Gender.Male
      ? "mars"
      : "venus";
  return (
    <div className="App">
      <Header as="h1">
        <Container>
          {patient?.name}
          <Icon name={genderName} />
        </Container>
      </Header>
      <Container>ssn: {patient?.ssn}</Container>
      <Container>occupation: {patient?.occupation}</Container>
      <Header as="h3">entries</Header>
      {patient?.entries.map((entry) => (
        <EntryPage entry={entry} key={entry.id} />
      ))}
      <NewHospital onSubmit={submitNewEntry} />
    </div>
  );
};

// doctor stethoscope heart

export default index;
