import { Schema, model } from "mongoose";




/**
 * @openapi
 * components:
 *  schemas:
 *    SpecializationSchema:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *
 *
 *
 */
const SpecializationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
});

export default model("Specialization", SpecializationSchema);
