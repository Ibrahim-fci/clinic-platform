import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    DoctorSchema:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - specialization
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        specialization:
 *            type: string
 *            description: doctor specialization id
 *        appointments:
 *            type: array
 *            items:
 *              type: object
 *              $ref: '#/components/schemas/AppointmentSchema'
 *
 *
 *
 */

const doctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    bio: { type: String },
    location: { type: String },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
    },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("Doctor", doctorSchema);
