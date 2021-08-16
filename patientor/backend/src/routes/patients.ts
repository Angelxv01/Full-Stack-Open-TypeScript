import express from "express";
import patientService from "../services/patientService";
import { sanitizePatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => res.json(patientService.getAll()));
router.post("/", (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  try {
    const sanitizedPatient = sanitizePatient(req.body);
    const patient = patientService.addPatient(sanitizedPatient);
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientService.findPatient(id);
  return patient ? res.send(patient) : res.sendStatus(404);
});

export default router;
