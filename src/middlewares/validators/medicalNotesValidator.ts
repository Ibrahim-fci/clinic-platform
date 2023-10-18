import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";

export default {
  createMedicalNoteValidator: [
    check("details").notEmpty().withMessage("details is required"),
    check("patientId").notEmpty().withMessage("patientId is required"),

    validatorMiddeleware,
  ],
  updateMedicalNoteValidator: [
    check("details").notEmpty().withMessage("details is required"),

    validatorMiddeleware,
  ],
};
