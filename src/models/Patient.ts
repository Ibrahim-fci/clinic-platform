import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    DOB: { type: Date },
    location: { type: String },
    phone: { type: String },
    bio: { type: String },
    image: { type: String },
    gender: {
      type: String,
      enum: ["male", "female"]
    },
    appointments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    ],
    medicaNotes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MedicalNotes" },
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

export default mongoose.model("Patient", patientSchema);
