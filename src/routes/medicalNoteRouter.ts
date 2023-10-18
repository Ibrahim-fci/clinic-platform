import express from "express";
const router = express.Router();

import MedicalNotesController from "../controllers/medicalNotes";
import Validator from "../middlewares/validators/medicalNotesValidator";
import { authorizeDoctor } from "../middlewares/auth/auth";

/**
 * @openapi
 * '/medical-notes/create/':
 *  post:
 *     tags:
 *      - MedicalNote
 *     description: end_point for adding medical-note to patient profile by doctor *Note(you must be authenticated as adoctor  to use this end point)
 *     summary: must be authenticated as a doctor to use this end_point
 *
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/CreateMedicalNoteSchema'
 *     responses:
 *          201:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      default: 'medical note addedd successfully to ahmed  hassan profile'
 */

router.post(
  "/create/",
  authorizeDoctor,
  Validator.createMedicalNoteValidator,
  MedicalNotesController.create
);

/**
 * @openapi
 * '/{medicalNoteId}/':
 *  put:
 *     tags:
 *      - MedicalNote
 *     description: end_point for uppdate medical-note by doctor who create it *Note(you must be authenticated as adoctor  to use this end point)
 *     summary: must be authenticated to use this end_point
 *     parameters:
 *       - in: path
 *         name: medicalNoteId
 *         schema:
 *          type: string
 *          required: true
 *          description: medicalNote  id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      defult: 'medical_note updated successfully'
 */

router.put(
  "/:medicalNoteId",
  authorizeDoctor,
  Validator.updateMedicalNoteValidator,
  MedicalNotesController.update
);

/**
 * @openapi
 * '/{medicalNoteId}/':
 *  delete:
 *     tags:
 *      - MedicalNote
 *     description: end_point for felete medical-note by doctor who create it *Note(you must be authenticated as adoctor  to use this end point)
 *     summary: must be authenticated to use this end_point
 *     parameters:
 *       - in: path
 *         name: medicalNoteId
 *         schema:
 *          type: string
 *          required: true
 *          description: medicalNote  id
 *     responses:
 *          200:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      defult: 'medical_note deleted successfully'
 */
router.delete(
  "/:medicalNoteId",
  authorizeDoctor,
  MedicalNotesController.delete
);
export default router;
