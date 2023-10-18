"use strict";

import ApiError from "./error";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ibrahimismail00000@gmail.com",
    pass: "rxmu qfox okwy ayde",
  },
});

async function sendEmail(to: string, subject: string, text: string) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "ibrahimismail00000@gmail.com", // sender address
      to: to, // list of receiversibrahim.fci2017@gmail.com

      subject: subject, // Subject line
      text: text, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    // console.log("Message sent: %s", info.response);
  } catch (error: any) {
    return {
      error: new ApiError(error.Message, 400),
    };
  }
}

export { sendEmail };
