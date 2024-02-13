import { check } from "express-validator";
import validatorMiddeleware from "./validationResult";
import roles from "../../utils/roles";

export default {
  createUserValidator: [
    check("email").isEmail().withMessage("Invalid email format"),
    check("firstName").notEmpty().withMessage("first name is required"),
    check("lastName").notEmpty().withMessage("last name is required"),
    check("password").notEmpty().withMessage("password is required"),
    check("role").isIn([roles.Patient, roles.Doctor]).withMessage("role is required"),


    validatorMiddeleware,
  ],

  loginValidator: [
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("password  is required"),
    check("role").isIn([roles.Patient, roles.Doctor]).withMessage("role is required"),

    validatorMiddeleware,
  ],
};
