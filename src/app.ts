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

// @desc Routes
app.use("/auth", UserRouter);
app.use("/appointments", AppointmentRouter);

//swagger Docs
swaggerDocs(app, PORT);

// @desc DB connetion func
connectDB(dbUrl);

// @desc handel gloabal errors
app.use(globalError);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
