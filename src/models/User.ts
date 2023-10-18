import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    UserRegisterSchema:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *        - role
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        password:
 *            type: string
 *        role:
 *            type: string
 *            enum: [patient , doctor]
 *        specializationID:
 *            type: string
 *            description: if user role is doctor specialization is required
 *
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserLoginSchema:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        password:
 *            type: string
 *        role:
 *            type: string
 *            enum: [patient , doctor]
 *
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserRegisterResponseSchema:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - role
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *           type: string
 *           example: ibrahim@gmail.com
 *        role:
 *            type: string
 *            enum: [patient , doctor]
 *
 *
 */

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "patient"], required: true },
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

export default mongoose.model("User", userSchema);
