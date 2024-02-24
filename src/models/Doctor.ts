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
    phone: { type: String },
    DOB: { type: Date },
    title: {
      type: String,
      enum: ["professer", "lecturer", "consultant", "Specialist"]
    },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    money: {
      type: Number
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialization",
    },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    rattings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Ratting" },
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

// Set the DOB field to store only the date component without the time
doctorSchema.path('DOB').get(function (dob: { toISOString: () => string; }) {
  return dob ? dob.toISOString().split('T')[0] : dob;
});


export default mongoose.model("Doctor", doctorSchema);
