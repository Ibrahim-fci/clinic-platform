import User from "../models/User";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Specialization from "../models/Specialization";


import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";

export default {

    getAll: expressAsyncHandler(async (req: any, res: any) => {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors });
    }),

    getOne: expressAsyncHandler(async (req: any, res: any) => {
        const doctor = await Doctor.findById(req.params.id);
        res.status(200).json({ doctor });
    }),


    filterBySpecializationIdAndNAme: expressAsyncHandler(async (req: any, res: any) => {

        const specializationId = req.params.specializationId
        const name = req.params.name

        let doctors: any = []

        // check if specialization 
        if (!specializationId && name) {
            doctors = await Doctor.find({ firstName: { $regex: name, $options: "i" } })
        } else if (!name && specializationId) {
            doctors = await Doctor.find({ specialization: specializationId })

        } else {
            doctors = await Doctor.find({
                $or: [
                    { firstName: { $regex: name, $options: "i" } },
                    { lastName: { $regex: name, $options: "i" } },
                    { specialization: specializationId }
                ]
            })

        }
        res.status(200).json({ doctors });
    })


}
