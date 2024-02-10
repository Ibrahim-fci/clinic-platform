import { Schema, model } from "mongoose";




/**
 * @openapi
 * components:
 *  schemas:
 *    RattingSchema:
 *      type: object
 *      required:
 *        - comment
 *        - rate
 *      properties:
 *        name:
 *          type: string
 *        ratting:
 *            type: number
 *
 *
 *
 */
const RattingSchema = new Schema({
    comment: { type: String },
    rate: { type: Number, default: 1 },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

export default model("Ratting", RattingSchema);
