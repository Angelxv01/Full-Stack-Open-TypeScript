import React from "react";
import { useStateValue } from "../state";
import {
  Container,
  Header,
  List,
  Icon,
  SemanticCOLORS
} from "semantic-ui-react";
import { Entry } from "../types";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryInfo = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
  const status: SemanticCOLORS[] = ["green", "yellow", "red", "purple"];
  const containerStyle = {
    border: "0.25em solid #d3d3d3",
    borderRadius: "0.5em",
    padding: "0.5em",
    margin: "0.5em 0"
  };

  let iconName: SemanticICONS | undefined;
  let healthStatus: SemanticCOLORS | undefined;

  switch (entry.type) {
    case "HealthCheck":
      iconName = "doctor";
      healthStatus = status[entry.healthCheckRating];
      break;
    case "Hospital":
      iconName = "hospital outline";
      break;
    case "OccupationalHealthcare":
      iconName = "stethoscope";
      break;
    default:
      assertNever(entry);
  }

  return (
    <Container style={containerStyle}>
      <Header>
        <Container>
          {entry.date}
          <Icon name={iconName} />
        </Container>
      </Header>
      <Container as="i">{entry.description}</Container>
      <List bulleted>
        {entry.diagnosisCodes?.map((code) => (
          <List.Item key={code}>
            {code} {diagnosis.find((d) => d.code === code)?.name}
          </List.Item>
        ))}
      </List>
      {healthStatus && <Icon name="heart" color={healthStatus} />}
    </Container>
  );
};

export default EntryInfo;
