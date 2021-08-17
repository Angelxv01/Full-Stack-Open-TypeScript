import {
  Gender,
  NewPatient,
  BaseEntry,
  Diagnose,
  HealthCheckRating,
  Entry,
  HospitalEntry,
  EntryWithoutId,
  HealthCheckEntry,
  OccupationalHealthcareEntry
} from "./types";
import diagnosesData from "./data/diagnoses.json";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseString = (object: any): string => {
  if (!object || !isString(object)) {
    throw new Error("Invalid type");
  }
  return object;
};

const parseDate = (object: unknown): string => {
  if (!object || !isString(object) || !isDate(object)) {
    throw new Error("Incorrect or missing date: " + object);
  }

  return object;
};

const parseGender = (object: unknown): Gender => {
  if (!object || !isGender(object)) {
    throw new Error("Incorrect or missing gender: " + object);
  }

  return object;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (!object || !isHealthCheckRating(object)) {
    throw new Error("Invalid health check rating " + object);
  }

  return object;
};

const parseType = (object: unknown): Entry["type"] => {
  if (!object || !isType(object)) {
    throw new Error("Invalid entry type " + object);
  }

  return object;
};

const isString = (object: unknown): object is string => {
  return typeof object === "string" || object instanceof String;
};

const isDate = (object: string): boolean => {
  return Boolean(Date.parse(object));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (object: any): object is Gender => {
  return Object.values(Gender).includes(object);
};

const isArray = (object: unknown): object is Array<string> => {
  return Array.isArray(object);
};

const isDiagnoseCode = (object: string): boolean => {
  return diagnosesCode.indexOf(object) !== -1;
};

const parseDiagnoses = (object: unknown): Array<Diagnose["code"]> => {
  // if diagnosis code array is missing, return empty array to fill the gap
  if (!object) {
    return [];
  }

  if (!isArray(object) || !object.every((obj) => isDiagnoseCode(obj))) {
    throw new Error("Invalid diagnoses code");
  }

  return object as Array<Diagnose["code"]>;
};

const isHealthCheckRating = (object: any): object is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(object);
};

const isType = (object: any): object is Entry["type"] => {
  return ["Hospital", "OccupationalHealthcare", "HealthCheck"].includes(object);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const sanitizePatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatient => {
  return {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation)
  };
};

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];
const diagnosesCode: Array<Diagnose["code"]> = diagnoses.map((obj) => obj.code);

type BaseEntryField = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
};

// this is not meant to export
const sanitizeBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes
}: BaseEntryField): Omit<BaseEntry, "id"> => {
  const result = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist)
  };

  return !diagnosisCodes
    ? result
    : { ...result, diagnosisCodes: parseDiagnoses(diagnosisCodes) };
};

const sanitizeHospital = ({
  discharge,
  description,
  date,
  specialist,
  diagnosisCodes
}: {
  discharge: { criteria: unknown; date: unknown };
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
}): Omit<HospitalEntry, "id"> => {
  return {
    type: "Hospital",
    discharge: {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria)
    },
    ...sanitizeBaseEntry({ description, date, specialist, diagnosisCodes })
  };
};

const sanitizeHealthCheck = ({
  healthCheckRating,
  description,
  date,
  specialist,
  diagnosisCodes
}: {
  healthCheckRating: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
}): Omit<HealthCheckEntry, "id"> => {
  return {
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
    type: "HealthCheck",
    ...sanitizeBaseEntry({ description, date, specialist, diagnosisCodes })
  };
};

const sanitizeOccupationalHealthCare = ({
  employerName,
  sickLeave,
  description,
  date,
  specialist,
  diagnosisCodes
}: {
  employerName: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
}): Omit<OccupationalHealthcareEntry, "id"> => {
  const result = {
    employerName: parseString(employerName),
    ...sanitizeBaseEntry({ description, date, specialist, diagnosisCodes })
  };

  return sickLeave
    ? {
        ...result,
        sickLeave: {
          startDate: parseDate(sickLeave?.startDate),
          endDate: parseDate(sickLeave?.endDate)
        },
        type: "OccupationalHealthcare"
      }
    : { ...result, type: "OccupationalHealthcare" };
};

export const sanitizeEntry = (entry: any): EntryWithoutId => {
  const type = parseType((entry as Entry).type);

  switch (type) {
    case "HealthCheck":
      return sanitizeHealthCheck(entry);
    case "Hospital":
      return sanitizeHospital(entry);
    case "OccupationalHealthcare":
      return sanitizeOccupationalHealthCare(entry);
    default:
      return assertNever(type);
  }
};
