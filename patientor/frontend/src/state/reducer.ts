import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "PATIENT_INFO";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { id: Patient["id"]; entry: Entry };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: [...action.payload, ...state.diagnosis]
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    // essentially this add a patient but since it exist already,
    // it should replace the old one adding ssn,
    // for semantic reason I separate this reducer
    case "PATIENT_INFO":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY": {
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: {
              ...state.patients[action.payload.id].entries,
              ...action.payload.entry
            }
          }
        }
      };
    }
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patients };
};
export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosis };
};
export const addPatient = (patients: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patients };
};
export const patientInfo = (patients: Patient): Action => {
  return { type: "PATIENT_INFO", payload: patients };
};
export const addEntry = (id: Patient["id"], entry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { id, entry } };
};
