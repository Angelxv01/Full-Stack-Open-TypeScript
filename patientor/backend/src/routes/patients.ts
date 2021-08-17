import express from "express";
import patientService from "../services/patientService";
import { sanitizeEntry, sanitizePatient } from "../utils";

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

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const newEntry = sanitizeEntry(body);
    const result = patientService.addEntry(id, newEntry);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

export default router;
