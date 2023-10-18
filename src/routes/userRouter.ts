import express from "express";

import AuthController from "../controllers/auth";
import Validator from "../middlewares/validators/createUserValidator";
import { authorize } from "../middlewares/auth/auth";
const router = express.Router();

/**
 * @openapi
 * '/auth/signup/':
 *  post:
 *     tags:
 *      - Auth
 *     description: register a new user (doctor or patient)
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/UserRegisterSchema'
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    user:
 *                      type: object
 *                      $ref: '#/components/schemas/UserRegisterResponseSchema'
 */

router.post("/signup/", Validator.createUserValidator, AuthController.signup);

/**
 * @openapi
 * '/auth/signin/':
 *  post:
 *     tags:
 *      - Auth
 *     description: user login end_point
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/UserLoginSchema'
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmY5NjdiYjA1OGFlYTVkNjc1ZWQ1YyIsImVtYWlsIjoiYW'
 */
router.post("/signin/", Validator.loginValidator, AuthController.signin);

/**
 * @openapi
 * '/auth/me/':
 *  get:
 *     tags:
 *      - Auth
 *     description: get User Object (patient , doctor)
 *     summary: must be authenticated to use this end_point
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    user:
 *                      type: object
 *                      $ref: '#/components/schemas/DoctorSchema'
 */

router.get("/me/", authorize, AuthController.me);

export default router;
