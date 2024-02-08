import express from "express";

import SpecializationController from "../controllers/specialization.controller";
import Validator from "../middlewares/validators/createUserValidator";
import { authorize } from "../middlewares/auth/auth";
import specializationController from "../controllers/specialization.controller";
const router = express.Router();

/**
 * @openapi
 * '/specializations/':
 *  post:
 *     tags:
 *      - Specialization
 *     description: add a new specialization
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
 *                    specialization:
 *                      type: object
 *                      $ref: '#/components/schemas/SpecializationSchema'
 */

router.post("/", authorize, specializationController.create);



/**
 * @openapi
 * '/specializations/':
 *  get:
 *     tags:
 *      - Specialization
 *     description: get all Specializations
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    specialization:
 *                      type: object
 *                      $ref: '#/components/schemas/SpecializationSchema'
 */

router.get("/", SpecializationController.getAll);





/**
 * @openapi
 * 'specializations/{specialization_id}/':
 *  get:
 *     tags:
 *      - Specialization
 *     parameters:
 *       - in: path
 *         name: specialization_id
 *         schema:
 *          type: string
 *          required: true
 *          description: specialization id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    specialization:
 *                      type: string
 *                      $ref: '#/components/schemas/SpecializationSchema'
 */



router.get("/:id", SpecializationController.getOne);

export default router;
