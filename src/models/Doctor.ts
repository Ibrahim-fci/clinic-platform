import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialization",
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("Doctor", doctorSchema);
