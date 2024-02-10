import express from "express";

import SpecializationController from "../controllers/specialization.controller";
import Validator from "../middlewares/validators/createUserValidator";
import { authorize } from "../middlewares/auth/auth";
import rattingController from "../controllers/ratting.controller";
const router = express.Router();

/**
 * @openapi
 * '/ratting/':
 *  post:
 *     tags:
 *      - Ratting
 *     description: add a new ratting to doctor
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/RattingSchema'
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    specialization:
 *                      type: object
 *                      $ref: '#/components/schemas/RattingSchema'
 */

router.post("/", authorize, rattingController.addDocRate);



/**
 * @openapi
 * '/ratting/':
 *  get:
 *     tags:
 *      - Ratting
 *     description: get doctor rattings
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: '#/components/schemas/RattingSchema'
 */

router.get("/:doctorId", rattingController.getDocRates);










export default router;





