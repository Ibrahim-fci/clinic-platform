import User from "../models/User";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";
import Specialization from "../models/Specialization";
import rules from "../utils/roles";
import ApiError from "../utils/error";
import encrypt from "../utils/bcryptText";
import jwt from "../utils/jwt";

import expressAsyncHandler = require("express-async-handler");

export default {
  signup: expressAsyncHandler(async (req: any, res: any) => {
    const { email, password, role, specializationID } = req.body;

    // @desc check if user exists before
    const user = await User.findOne({ email });
    if (user)
      return res.json({ error: new ApiError("this user existed before", 400) });

    // @desc create patient if role == patient
    if (role == rules.Patient) await creatPatient(req.body);
    // @desc create doctor if role == doctor
    else if (role == rules.Doctor) {
      const specialization = await Specialization.findOne({
        _id: specializationID,
      });
      if (!specialization)
        return res.json({
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
      return res.status(404).json({
        error: new ApiError(
          `user with email: ${email} and role : ${role} does not exist`,
          404
        ),
      });

    // @desc check if password matched
    if (!encrypt.decryptText(password, user.password))
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
