import User from "../models/User";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Specialization from "../models/Specialization";
import rules from "../utils/roles";
import ApiError from "../utils/error";
import encrypt from "../utils/bcryptText";
import jwt from "../utils/jwt";
import dotenv from "dotenv";
dotenv.config();

import expressAsyncHandler = require("express-async-handler");
import roles from "../utils/roles";


const HOST = process.env.HOST;

export default {
  signup: expressAsyncHandler(async (req: any, res: any) => {
    const { email, password, role, specializationID } = req.body;

    // @desc check if user exists before
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ error: new ApiError("this user existed before", 400) });

    // @desc create patient if role == patient
    if (role == rules.Patient) await creatPatient(req.body);
    // @desc create doctor if role == doctor
    else if (role == rules.Doctor) {
      const specialization = await Specialization.findOne({
        _id: specializationID,
      });
      if (!specialization)
        return res.status(400).json({
          error: new ApiError(
            `specialization with id ${specializationID} does not exists`,
            400
          ),
        });
      await createDoctor(req.body, specialization._id);
    }

    //@desc create a new user
    const hash = await encrypt.encryptText(password);
    const newUser = await User.create({ ...req.body, password: hash });

    return res.status(201).json({ user: newUser });
  }),
  signin: expressAsyncHandler(async (req: any, res: any) => {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
    if (!user)
      return res.status(404).status(404).json({
        error: new ApiError(
          `user with email: ${email} and role : ${role} does not exist`,
          404
        ),
      });



    // @desc check if password matched
    if (!(encrypt.decryptText(password, user.password)))
      return res
        .status(400)
        .json({ error: new ApiError(`Invalid email or password`, 400) });

    // @ create user Token
    const token = jwt.generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({ token });
  }),

  me: expressAsyncHandler(async (req: any, res: any) => {
    const user = req.user;
    if (user.role == roles.Patient) {
      const patient = await Patient.findOne({ email: user.email })
        .populate("appointments")
        .populate("medicaNotes");

      res.status(200).json({ user: patient });
    } else if (user.role == roles.Doctor) {
      const doctor = await Doctor.findOne({ email: user.email }).populate(
        "appointments"
      );
      return res.status(200).json({ user: doctor });
    }

    return res.status(400).json({
      error: new ApiError("user must witt role[patient , doctor", 400),
    });
  }),


  updateUserProfile: expressAsyncHandler(async (req: any, res: any) => {

    const user = req.user;
    const file = req.file;

    console.log(file);
    console.log(req.body);

    //  @desc check if  user is patient or doctor
    if (user.role == roles.Patient) {
      const patient = await Patient.findOne({ email: user.email });
      if (!patient)
        return res
          .status(400)
          .json({ error: new ApiError("patient does not exist", 400) });

      patient.firstName = req.body.firstName ? req.body.firstName : patient.firstName;
      patient.lastName = req.body.lastName ? req.body.lastName : patient.lastName;
      patient.location = req.body.location ? req.body.location : patient.location;
      patient.phone = req.body.phone ? req.body.phone : patient.phone;
      patient.image = file ? `${HOST}${file.filename}` : patient.image;

      await patient.save();
      return res.status(200).json({ user: patient });

    } else if (user.role == roles.Doctor) {
      const doctor = await Doctor.findOne({ email: user.email });
      if (!doctor)
        return res
          .status(400)
          .json({ error: new ApiError("doctor does not exist", 400) });

      doctor.firstName = req.body.firstName ? req.body.firstName : doctor.firstName;
      doctor.lastName = req.body.lastName ? req.body.lastName : doctor.lastName;
      doctor.location = req.body.location ? req.body.location : doctor.location;
      doctor.phone = req.body.phone ? req.body.phone : doctor.phone;
      doctor.image = file ? `${HOST}${file.filename}` : doctor.image;
      await doctor.save();
      return res.status(200).json({ user: doctor });
    }
  })
};

// @desc create patient fun
async function creatPatient(data: any) {
  const hash = await encrypt.encryptText(data.password);
  const patient = await Patient.create({ ...data, password: hash });

  return patient;
}

// @desc create doctor fun
async function createDoctor(data: any, specialization: any) {

  const hash = await encrypt.encryptText(data.password);
  const doctor = await Doctor.create({
    ...data,
    password: hash,
    specialization,
  });
  return doctor;
}
