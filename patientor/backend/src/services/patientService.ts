import patient from '../data/patients.json';

import { PatientInfo } from '../types';

const getAll = (): PatientInfo[] => {
  return patient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getAll
};
