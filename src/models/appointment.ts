import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAppointmentSchema:
 *      type: object
 *      required:
 *        - doctorId
 *        - reason
 *      properties:
 *        date:
 *          type: string
 *        doctorId:
 *            type: string
 *            description: doctor id
 *        reason:
 *            type: string
 *            description: appointment reason
 *
 *
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    AppointmentSchema:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *        - role
 *      properties:
 *        date:
 *          type: string
 *        reason:
 *          type: string
 *        accepted:
 *           type: boolean
 *        isEnded:
 *            type: boolean
 *            default: false
 *        doctor:
 *            type: string
 *            description: doctor id
 *        patient:
 *            type: string
 *            description: patient id
 *
 *
 */

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: Date, required: true, default: Date.now() },
  dayOfWeek: {
    type: Number
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  reason: { type: String, required: false },
  accepted: { type: Boolean, default: false },
  isEnded: { type: Boolean, default: false },
});

export default mongoose.model("Appointment", appointmentSchema);
