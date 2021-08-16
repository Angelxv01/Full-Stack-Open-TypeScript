import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Header, Icon, Container } from "semantic-ui-react";
import { Gender, Patient } from "../types";

import { patientInfo, useStateValue } from "../state";

const index = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | undefined>(undefined);
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      const fetched = patients[id]?.ssn;
      if (fetched) {
        return setPatient(patients[id]);
      }

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
    </div>
  );
};

export default index;
