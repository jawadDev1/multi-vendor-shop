import jwt from "jsonwebtoken";
import { ErrorHandler } from "./ErrorHandle.js";
import { IActivationToken } from "#types/common.js";
import { IUserBody } from "#types/controllers.js";
import { Response } from "express";
import { IUser } from "#types/models.js";

export const signToken = (payload: Record<string, any>): string => {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });

  return token;
};

export const generateActivationToken = (payload: Record<string, any>) => {
  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, { expiresIn: "5m" });

  return token;
};

export const verifyToken = (token: string): IActivationToken => {
  try {
    const secret = process.env.JWT_SECRET!;

    const isValid = jwt.verify(token, secret) as IActivationToken;

    if (!isValid) throw new ErrorHandler("Invalid token", 400);

    return isValid;
  } catch (error) {
    throw new ErrorHandler(error as string, 400);
  }
};

export const sendToken = async (
  user: IUser,
  statusCode: number,
  res: Response,
  days: number = 7
) => {
  const token = signToken({
    id: user?.id,
    email: user.email,
    name: user.name,
    profile: user.profile,
  });
  const options = {
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
const userObject = user?.toObject();
  return res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      verified: true,
      message: "Logged in successfully",
      data: { ...userObject, password: "" },
    });
};
