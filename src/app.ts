import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
dotenv.config();

// @desc Routers
import UserRouter from "./routes/userRouter";
import AppointmentRouter from "./routes/appointmentRouter";
import MedicalNotesRouter from "./routes/medicalNoteRouter";
import specializationRouter from "./routes/specializationRouter";
import doctorsRouter from "./routes/doctorsRouter";
import rattingRouter from "./routes/rattingRouter";
import bodyParser from "body-parser";
import path from "path";



import connectDB from "./utils/connectDB";
import globalError from "./middlewares/gloabal-error";
import swaggerDocs from "./utils/swagger";
// import * as options from "./swaagerDocs.json";

const app = express();
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.URL?.toString();

// @desc middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../uploads")));

// @desc Routes
app.use("/auth", UserRouter);
app.use("/appointments", AppointmentRouter);
app.use("/medical-notes", MedicalNotesRouter);
app.use("/specializations", specializationRouter);
app.use("/doctors", doctorsRouter);
app.use("/ratting", rattingRouter);

//swagger Docs
swaggerDocs(app, PORT);

// @desc DB connetion func
connectDB(dbUrl);

// @desc handel gloabal errors
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
