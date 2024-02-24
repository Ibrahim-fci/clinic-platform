import mongoose from "mongoose";

const DoctorAvailableTimeSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor"
        },
        dayOfWeek: {
            type: Number
        },
        startTime: {
            type: String
        },
        endTime: {
            type: String
        }
    }
);




export default mongoose.model("DoctorAvailableTime", DoctorAvailableTimeSchema);















// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define schema for Doctor's available time
// const DoctorAvailableTimeSchema = new Schema({
//     doctor: {
//         type: Schema.Types.ObjectId,
//         ref: 'Doctor', // Reference to the Doctor model
//         required: true
//     },
//     dayOfWeek: {
//         type: Number, // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
//         required: true
//     },
//     startTime: {
//         type: String, // Format: HH:mm (e.g., "09:00")
//         required: true
//     },
//     endTime: {
//         type: String, // Format: HH:mm (e.g., "17:00")
//         required: true
//     },
//     // You can add additional fields as needed, such as isAvailable (Boolean) or location.
// });

// // Create and export the DoctorAvailableTime model
// module.exports = mongoose.model('DoctorAvailableTime', DoctorAvailableTimeSchema);
