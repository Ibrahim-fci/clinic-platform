
import Ratting from "../models/Ratting";


import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";
import ApiError from "../utils/error";
import Doctor from "../models/Doctor";
import Patient from "../models/Patient";

export default {

    addDocRate: expressAsyncHandler(async (req: any, res: any) => {
        const { comment, rate, doctorId } = req.body
        const user = req.user



        // check if the user is patient
        if (user.role != roles.Patient)
            return res.status(400).json({ error: new ApiError("you are not patient", 400) });

        // get patient obj
        const patient = await Patient.findOne({ email: user.email });
        if (!patient)
            return res.status(400).json({ error: new ApiError("patient does not exist", 400) });


        // check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor)
            return res.status(400).json({ error: new ApiError("doctor does not exist", 400) });



        // check if this patient rates this doc before
        const isExist = await Ratting.findOne({ doctor: doctorId, patient: patient?._id });
        if (isExist)
            return res.status(400).json({ error: new ApiError("you already rated this doctor", 400) });


        const ratting = await Ratting.create({ comment, rate, doctor: doctorId, patient: patient?._id });


        // push the new ratting to doctor
        doctor.rattings.push(ratting._id);
        await doctor.save();


        res.status(200).json({ ratting });
    }),



    getDocRates: expressAsyncHandler(async (req: any, res: any) => {
        const { doctorId } = req.params
        const ratting = await Ratting.find({ doctor: doctorId })
        res.status(200).json({ ratting });
    }),






}



