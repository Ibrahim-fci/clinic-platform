import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Appointment from "../models/appointment";
import ApiError from "../utils/error";
import expressAsyncHandler from "express-async-handler";
import { sendEmail } from "../utils/sendMessage";

export default {
  create: expressAsyncHandler(async (req: any, res: any) => {
    const { doctorId, date, reason } = req.body;

    const { email } = req.user;
    // @desc Get Patient from Auth middeleware
    const patient = await Patient.findOne({ email });
    if (!patient)
      return res
        .status(404)
        .json({ error: new ApiError("patient does not exist", 404) });
    // @desc check if  doctor exist
    const doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor)
      return res
        .status(404)
        .json({ error: new ApiError("doctor does not exist", 404) });

    const appointement = await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      reason,
      date,
    });

    // @desc push the new appointment to appintments in doc &patient
    patient.appointments.push(appointement._id);
    doctor.appointments.push(appointement._id);
    await patient.save();
    await doctor.save();

    // @desc send notification maile to patient & doctor
    const docMsg = `patient: ${patient.firstName} ${patient.lastName} has scheduled an appointment with you and is awaiting your approval`;
    const patientMsg = `You have successfully sent a reservation request to Dr. ${doctor.firstName} ${doctor.lastName}`;
    await sendEmail(doctor.email, "Appointment Booking", docMsg);
    await sendEmail(patient.email, "Appointment Booking", patientMsg);

    return res.status(201).json({ appointement });
  }),

  // @desc method for handeling accepetance and cancellation of an appointment
  acceceptAppointment: expressAsyncHandler(async (req: any, res: any) => {
    const { email } = req.user;
    const { appointmentId } = req.params;

    const appointement = await Appointment.findById(appointmentId);
    if (!appointement)
      return res.status(404).json({
        error: new ApiError(
          `appointment with id : ${appointmentId} does not exist`,
          404
        ),
      });
    const doctor = await Doctor.findById(appointement.doctor);
    const patient = await Patient.findById(appointement.patient);

    if (doctor?.email !== email)
      return res.status(400).json({
        error: new ApiError(
          `this appointment does not belong to th Dr. ${doctor?.firstName}`,
          400
        ),
      });

    // @desc change appointment status from false -> true and vice versa
    appointement.accepted = !appointement.accepted;
    await appointement.save();

    // sending messsages to patient
    const patientMsg = appointement.accepted
      ? `Dr. ${doctor?.firstName} ${doctor?.lastName} accepted your appointment  At : ${appointement.date}`
      : `Dr. ${doctor?.firstName} ${doctor?.lastName} canceled your appointment`;
    await sendEmail(patient?.email || "", "Appointment Booking", patientMsg);

    return res.status(200).json({ appointement });
  }),
};
