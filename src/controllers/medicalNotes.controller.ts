import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import ApiError from "../utils/error";
import expressAsyncHandler from "express-async-handler";
import { sendEmail } from "../utils/sendMessage";
import MedicalNotes from "../models/medicalNotes";

export default {
  create: expressAsyncHandler(async (req: any, res: any) => {
    const user = req.user;
    const { patientId, details, date } = req.body;

    // @desc Get Doctor from Auth middeleware
    const doctor = await Doctor.findOne({ email: user.email });

    const patient = await Patient.findById(patientId);
    if (!patient)
      return res
        .status(400)
        .json({ error: new ApiError("patient does not exist", 400) });

    // @desc creat a new Medical note anp push it into the the patient
    const medical_note = await MedicalNotes.create({
      patient: patient._id,
      details,
      date,
      doctor: doctor?._id,
    });

    // @desc push the new medical notes to patient profile
    patient.medicaNotes.push(medical_note._id);
    await patient.save();

    // @desc send notification maile to patient
    const docMsg = `doctor: ${doctor?.firstName} ${doctor?.lastName} added a new medicalNote to your profile  , please check it`;
    await sendEmail(patient.email, "MedicalNote added To Your Profile", docMsg);

    return res.status(200).json({
      msg: `medical note addedd successfully to ${patient.firstName}  ${patient.lastName} profile`,
    });
  }),

  update: expressAsyncHandler(async (req: any, res: any) => {
    const user = req.user;
    const { details } = req.body;
    const { medicalNoteId } = req.params;

    // @desc Get Doctor from Auth middeleware
    const doctor = await Doctor.findOne({ email: user.email });
    if (!doctor) return;

    const medicalNote = await MedicalNotes.findById(medicalNoteId);
    if (!medicalNote)
      return res
        .status(400)
        .json({ error: new ApiError("medical note does not exist", 400) });

    // @desc check if authenticated doctor he is the creator of this medical note
    if (!medicalNote.doctor.equals(doctor._id))
      return res.status(400).json({
        error: new ApiError(
          "you have no permission to update this medical note",
          400
        ),
      });

    medicalNote.details = details ? details : medicalNote.details;
    await medicalNote.save();

    // @desc send notification maile to patient
    const patient = await Patient.findById(medicalNote.patient);
    if (!patient) return;

    const docMsg = `doctor: ${doctor?.firstName} ${doctor?.lastName} updated a new medicalNote to your profile  , please check it`;
    await sendEmail(
      patient?.email,
      "MedicalNote updated To Your Profile",
      docMsg
    );

    return res.status(200).json({
      msg: "medical_note updated successfully",
    });
  }),

  delete: expressAsyncHandler(async (req: any, res: any) => {
    const user = req.user;
    const { medicalNoteId } = req.params;

    // @desc Get Doctor from Auth middeleware
    const doctor = await Doctor.findOne({ email: user.email });
    if (!doctor) return;

    const medicalNote = await MedicalNotes.findById(medicalNoteId);
    if (!medicalNote)
      return res
        .status(400)
        .json({ error: new ApiError("medical note does not exist", 400) });

    // @desc check if authenticated doctor he is the creator of this medical note
    if (!medicalNote.doctor.equals(doctor._id))
      return res.status(400).json({
        error: new ApiError(
          "you have no permission to delete this medical note",
          400
        ),
      });

    // @desc delete the medical note
    medicalNote.deleteOne();
    await medicalNote.save();

    return res.status(200).json({
      msg: "medical_note deleted successfully",
    });
  }),
};
