import express from "express";
import diagnosesData from "../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Array<Diagnose> = diagnosesData;

const router = express.Router();

router.get("/", (_req, res) => res.json(diagnoses));

export default router;
