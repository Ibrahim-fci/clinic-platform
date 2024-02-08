import User from "../models/User";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Specialization from "../models/Specialization";


import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";

export default {
    getAll: expressAsyncHandler(async (req: any, res: any) => {
        const specialization = await Specialization.find();
        res.status(200).json({ specialization });
    }),


    getOne: expressAsyncHandler(async (req: any, res: any) => {
        const specialization = await Specialization.findById(req.params.id);
        res.status(200).json({ specialization });
    }),


    create: expressAsyncHandler(async (req: any, res: any) => {
        const specialization = await Specialization.create(req.body);
        res.status(200).json({ specialization });
    }),

}
