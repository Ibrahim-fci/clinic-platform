import mongoose from "mongoose";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateMedicalNoteSchema:
 *      type: object
 *      required:
 *        - patientId
 *        - details
 *      properties:
 *        date:
 *          type: string
 *        patientId:
 *            type: string
 *            description: doctor id
 *        details:
 *            type: string
 *            description: appointment reason
 *
 *
 */
/**
 * @openapi
 * components:
 *  schemas:
 *    MedicalNoteSchema:
 *      type: object
 *      required:
 *        - patient
 *        - details
 *        - doctor
 *      properties:
 *        date:
 *          type: string
 *        details:
 *          type: string
 *        isrecived:
 *           type: boolean
 *           default: false
 *        doctor:
 *            type: string
 *            description: doctor id
 *        patient:
 *            type: string
 *            description: patient id
 *
 *
 */

const medicalNotesSchema = new mongoose.Schema({
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
  details: { type: String, required: true },
  isrecived: { type: Boolean, default: false },
});

export default mongoose.model("MedicalNotes", medicalNotesSchema);
