import mongoose from "mongoose";

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
 *          type: Date
 *        reason:
 *          type: string
 *        accepted:
 *           type: boolean
 *        isEnded:
 *            type: boolean
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
  reason: { type: String, required: true },
  accepted: { type: Boolean, default: false },
  isEnded: { type: Boolean, default: false },
});

export default mongoose.model("Appointment", appointmentSchema);
