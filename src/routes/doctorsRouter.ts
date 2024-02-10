import express from "express";

import SpecializationController from "../controllers/specialization.controller";
import Validator from "../middlewares/validators/createUserValidator";
import { authorize } from "../middlewares/auth/auth";
import doctorController from "../controllers/doctors.controller";
const router = express.Router();

/**
 * @openapi
 * '/doctors/':
 *  get:
 *     tags:
 *      - Doctors
 *     description: get all doctors
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    doctors:
 *                      type: object
 *                      $ref: '#/components/schemas/DoctorSchema'
 */

router.get("/", doctorController.getAll);


/**
 * @openapi
 * '/doctors/?name={name}&specializationId={specializationId}':
 *  get:
 *     tags:
 *      - Doctors
 *     description: Filter Doctors By name and specialization
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *          type: string
 *          required: true
 *          description: doctor name
 *       - in: path
 *         name: specializationId
 *         schema:
 *          type: string
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    type: object
 *                    $ref: '#/components/schemas/DoctorSchema'
 * 
 */





router.get("/filter/", doctorController.filterBySpecializationIdAndNAme);




/**
 * @openapi
 * '/doctors/{doctorId}/':
 *  get:
 *     tags:
 *      - Doctors
 *     description: get a  Doctor By Id
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *          type: string
 *          required: true
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

router.get("/:id", doctorController.getOne);



router.get("/best/rated/", doctorController.bestRatededDoctor);


export default router;
