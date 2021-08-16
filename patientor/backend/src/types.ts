// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientInfo = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
