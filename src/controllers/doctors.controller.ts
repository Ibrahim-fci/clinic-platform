import User from "../models/User";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Specialization from "../models/Specialization";


import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";

export default {

    getAll: expressAsyncHandler(async (req: any, res: any) => {


        let { page, pageSize } = req.query

        page = page ? page : 1
        pageSize = pageSize ? pageSize : 10


        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;



        // @desc get all products
        const doctorsNum: number = await Doctor.countDocuments({})
        const doctors = await Doctor.find({}).skip(skip)
            .limit(pageSize)
            .exec()

        return res.status(200).json({ doctors, pages: Math.ceil(doctorsNum / pageSize) || 1 })

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
