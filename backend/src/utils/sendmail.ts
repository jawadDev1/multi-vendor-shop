import nodemailer from "nodemailer";
import { ErrorHandler } from "./ErrorHandle.js";

const sendMail = async (to: string, subject: string, text: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: parseInt(process.env.SMTP_PORT!),
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw new ErrorHandler(error as string, 500);
  }
};

export { sendMail };
