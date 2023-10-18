import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
  createAppointmentValidator: [
    check("doctorId").notEmpty().withMessage("doctorId name is required"),
    check("reason").notEmpty().withMessage("reason  is required"),
    check("date").isDate().withMessage("appointment date is required"),

    validatorMiddeleware,
  ],
};
