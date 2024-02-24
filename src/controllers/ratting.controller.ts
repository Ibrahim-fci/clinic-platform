
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
        if (isExist) {
            // update it with the new rate
            isExist.rate = rate
            isExist.comment = comment ? comment : isExist.comment
            await isExist.save()

            return res.status(200).json({ ratting: isExist });
        }

        // return res.status(400).json({ error: new ApiError("you already rated this doctor", 400) });



        if (!comment)
            return res.status(400).json({ error: new ApiError("please add comment", 400) });
        const ratting = await Ratting.create({ comment, rate, doctor: doctorId, patient: patient?._id });


        // push the new ratting to doctor
        doctor.rattings.push(ratting._id);
        await doctor.save();


        res.status(200).json({ ratting });
    }),



    getDocRates: expressAsyncHandler(async (req: any, res: any) => {
        const { doctorId } = req.params

        let { page, pageSize } = req.query

        page = page ? page : 1
        pageSize = pageSize ? pageSize : 5

        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;


        // @desc get all products
        const rattings = await Ratting.find({ doctor: doctorId }).populate('patient').skip(skip)
            .limit(pageSize)
            .exec()
        const rattingsNum = await Ratting.countDocuments({ doctor: doctorId })
        return res.status(200).json({ ratting: rattings, pages: Math.ceil(rattingsNum / pageSize) || 1 })

    }),

    getRate: expressAsyncHandler(async (req: any, res: any) => {

        const rateId = req.params.id
        const ratting = await Ratting.findById(rateId)
        res.status(200).json({ ratting });

    }),

    deleteRate: expressAsyncHandler(async (req: any, res: any) => {
        const rateId = req.params.id
        const ratting = await Ratting.findByIdAndDelete(rateId)
        res.status(200).json({ ratting });
    }),





}



