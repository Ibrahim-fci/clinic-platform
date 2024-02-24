
import AvilableTime from "../models/AvilableTime";


import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";
import ApiError from "../utils/error";
import Doctor from "../models/Doctor";

export default {
    add: expressAsyncHandler(async (req: any, res: any) => {

        const { day, from, to } = req.body;
        const user = req.user;

        // @desc get the doctor from the auth middleware
        const doctor = await Doctor.findOne({ email: user.email });
        if (!doctor) return res.status(400).json({ error: new ApiError("doctor does not exist", 400) });
        const doctorId = doctor._id;


        // check if doctor add avilable time between start and end before in the same day
        const check = await AvilableTime.find({
            doctor: doctorId,
            dayOfWeek: day,
            $or: [
                { startTime: { $lt: to }, endTime: { $gt: from } }, // Existing time overlaps with new time
                { startTime: { $gte: from, $lt: to } }, // New time starts within existing time
                { endTime: { $gt: from, $lte: to } }, // New time ends within existing time
                { startTime: { $lte: from }, endTime: { $gte: to } }, // New time fully contains existing time

            ]
        });

        if (check.length > 0) {
            return res.status(400).json({ error: new ApiError("this time is not available", 400) });
        }




        const avilableTime = await AvilableTime.create({ dayOfWeek: day, startTime: from, endTime: to, doctor: doctorId });

        // @desc push the new avilable time to doctor profile
        doctor?.availableTimes.push(avilableTime._id);
        await doctor.save();

        res.status(200).json({ avilableTime });


    }),

    update: expressAsyncHandler(async (req: any, res: any) => {

        const { id } = req.params;
        const { updatedDay, updatedFrom, updatedTo } = req.body;
        const user = req.user;



        // @desc get the doctor from the auth middleware
        const doctor = await Doctor.findOne({ email: user.email });
        if (!doctor) return res.status(400).json({ error: new ApiError("doctor does not exist", 400) });


        const doctorId = doctor._id;


        // @desc check if avilable time exist
        const avilableTime = await AvilableTime.findById(id);
        if (!avilableTime) return res.status(400).json({ error: new ApiError("avilableTime does not exist", 400) });


        // check if avilable time obj belongs to this doctor
        if (avilableTime.doctor) {
            if (!avilableTime.doctor.equals(doctorId)) return res.status(400).json({ error: new ApiError("you have no permission to update this avilableTime", 400) });
        }



        // check if doctor add avilable time between start and end before in the same day
        const check = await AvilableTime.find({
            doctor: doctorId,
            dayOfWeek: updatedDay,
            $or: [
                { startTime: { $lt: updatedTo }, endTime: { $gt: updatedFrom } }, // Existing time overlaps with new time
                { startTime: { $gte: updatedFrom, $lt: updatedTo } }, // New time starts within existing time
                { endTime: { $gt: updatedFrom, $lte: updatedTo } }, // New time ends within existing time
                { startTime: { $lte: updatedFrom }, endTime: { $gte: updatedTo } }, // New time fully contains existing time

            ]
        });

        if (check.length > 0) return res.status(400).json({ error: new ApiError("this time is not avilable", 400) });


        avilableTime.dayOfWeek = updatedDay;
        avilableTime.startTime = updatedFrom;
        avilableTime.endTime = updatedTo;
        avilableTime.save();
        res.status(200).json({ avilableTime });
    }),



    delete: expressAsyncHandler(async (req: any, res: any) => {
        const { id } = req.params;
        const user = req.user;

        // @desc get the doctor from the auth middleware
        const doctor = await Doctor.findOne({ email: user.email });
        if (!doctor) return res.status(400).json({ error: new ApiError("doctor does not exist", 400) });


        const doctorId = doctor._id;

        // @desc check if avilable time exist
        const avilableTime = await AvilableTime.findById(id);
        if (!avilableTime) return res.status(400).json({ error: new ApiError("avilableTime does not exist", 400) });


        // check if avilable time obj belongs to this doctor
        if (avilableTime.doctor) {
            if (!avilableTime.doctor.equals(doctorId)) return res.status(400).json({ error: new ApiError("you have no permission to delete this avilableTime", 400) });
        }


        avilableTime.deleteOne();
        res.status(200).json({ msg: "avilableTime deleted successfully" });


    }),






}
