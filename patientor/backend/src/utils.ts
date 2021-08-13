import { Gender, NewPatient } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseString = (object: any): string => {
  if (!object || !isString(object)) {
    throw new Error('Invalid type');
  }
  return object;
};

export const parseDate = (object: unknown): string => {
  if (!object || !isString(object) || !isDate(object)) {
    throw new Error('Incorrect or missing date: ' + object);
  }

  return object;
};

export const parseGender = (object: unknown): Gender => {
  if (!object || !isGender(object)) {
    throw new Error('Incorrect or missing gender: ' + object);
  }

  return object;
};

const isString = (object: unknown): object is string => {
  return typeof object === 'string' || object instanceof String;
};

const isDate = (object: string): boolean => {
  return Boolean(Date.parse(object));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (object: any): object is Gender => {
  return Object.values(Gender).includes(object);
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
