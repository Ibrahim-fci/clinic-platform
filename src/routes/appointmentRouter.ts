import express from "express";

import AppointmentController from "../controllers/appointments";
import Validator from "../middlewares/validators/appointmentValidator";
import { authorizePatient, authorizeDoctor } from "../middlewares/auth/auth";
const router = express.Router();

router.post(
  "/create/",
  authorizePatient,
  Validator.createAppointmentValidator,
  AppointmentController.create
);

router.get(
  "/accept/:appointmentId",
  authorizeDoctor,
  AppointmentController.acceceptAppointment
);
export default router;
