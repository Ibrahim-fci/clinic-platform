import mongoose from "mongoose";

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
