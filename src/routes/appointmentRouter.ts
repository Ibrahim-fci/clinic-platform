import express from "express";

import AppointmentController from "../controllers/appointments.controller";
import Validator from "../middlewares/validators/appointmentValidator";
import { authorizePatient, authorizeDoctor, authorize } from "../middlewares/auth/auth";
import availableTimeController from "../controllers/availableTime.controller";
const router = express.Router();

/**
 * @openapi
 * '/appointments/create/':
 *  post:
 *     tags:
 *      - Appointment
 *     description: end_point for patient to reserve an appointment with a doctor *Note(you must be authenticated to use this end point)
 *     summary: must be authenticated to use this end_point
 *
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/CreateAppointmentSchema'
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    appointement:
 *                      type: object
 *                      $ref: '#/components/schemas/AppointmentSchema'
 */
router.post(
  "/create/",
  authorizePatient,
  Validator.createAppointmentValidator,
  AppointmentController.create
);

/**
 * @openapi
 * /appointments/accept/{appointmentId}:
 *  get:
 *     tags:
 *      - Appointment
 *     description: end_point for doctor to accept patient appointment     *Note(you must be authenticated to use this end point)
 *     summary: must be authenticated to use this end_point
 *
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *          type: string
 *          required: true
 *          description: appointment id
 *
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    appointement:
 *                      type: object
 *                      $ref: '#/components/schemas/AppointmentSchema'
 */
router.get(
  "/accept/:appointmentId",
  authorizeDoctor,
  AppointmentController.acceceptAppointment
);




router.post("/availableTime", authorize, availableTimeController.add);
router.put("/availableTime/:id", authorize, availableTimeController.update);
export default router;
