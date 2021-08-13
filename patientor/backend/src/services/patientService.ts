import patientData from '../data/patients.json';
import { v1 as uuid } from 'uuid';

import { NewPatient, Patient, PatientInfo } from '../types';

const patient: Array<Patient> = patientData as Array<Patient>;

const getAll = (): PatientInfo[] => {
  return patient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient: Patient = { ...patientData, id: uuid() };
  patient.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};
