import patientData from "../data/newPatients";
import { v1 as uuid } from "uuid";

import { NewPatient, Patient, PatientInfo } from "../types";

const patient: Patient[] = patientData as Patient[];

const getAll = (): PatientInfo[] => {
  return patient.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  );
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient: Patient = { ...patientData, id: uuid(), entries: [] };
  patient.push(newPatient);
  return newPatient;
};

const findPatient = (id: string): PatientInfo | undefined => {
  const res = patient.find((obj) => obj.id === id);
  return res || undefined;
};

export default {
  getAll,
  addPatient,
  findPatient
};
