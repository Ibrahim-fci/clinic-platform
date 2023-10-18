import { Schema, model } from "mongoose";

const SpecializationSchema = new Schema({
  name: String,
});

export default model("Specialization", SpecializationSchema);
