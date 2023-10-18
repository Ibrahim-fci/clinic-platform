import mongoose from "mongoose";

const connectDB = async (url: any) => {
  await mongoose
    .connect(url)
    .then(() => console.log("Connected!"))
    .catch(() => {
      console.log("db connection error");
    });
};

export default connectDB;
