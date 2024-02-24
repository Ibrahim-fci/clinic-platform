import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
  createAppointmentValidator: [
    check("doctorId").notEmpty().withMessage("doctorId name is required"),
    check("reason").notEmpty().withMessage("reason  is required"),
    check("date").isDate().withMessage("appointment date is required"),
    check("from").notEmpty().withMessage("from time is required"),
    check("to").notEmpty().withMessage("to time is required"),
    check("day").notEmpty().withMessage("day is required and must be number between 0 to 6"),

    validatorMiddeleware,
  ],
};
