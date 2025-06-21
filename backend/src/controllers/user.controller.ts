import asyncHandler from "#middleware/asyncHandler.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUserBody } from "#types/controllers.js";
import { UserModel } from "#models/user.meodel.js";
import { sanitizeUser } from "#utils/index.js";
import { generateActivationToken, sendToken, verifyToken } from "#utils/jwt.js";
import { sendMail } from "#utils/sendmail.js";

const handleSignup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IUserBody = req.body;

      const valid = Object.values(body).every(
        (val) => val !== undefined && val !== null
      );

      if (!valid) {
        next(new ErrorHandler("all fields are required", 400));
      }

      const alreadyExists = await UserModel.find({ email: body.email });

      if (alreadyExists) {
        next(new ErrorHandler("Account already exists", 400));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const user = await UserModel.create({
        ...body,
        password: hashedPassword,
      });

      const token = generateActivationToken({
        id: user._id,
        email: user.email,
      });
      const activationUrl = `${process.env.APP_URL}/activate/${token}`;

      await sendMail(
        user.email,
        "Activate Acccount",
        `Hello ${user.name}, click on the link to activate your account ${activationUrl}`
      );

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: sanitizeUser(user),
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

// handle User Account Activation
const handleActivate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      if (!token) next(new ErrorHandler("token is required", 400));

      const data = verifyToken(token);

      const user = await UserModel.findByIdAndUpdate(data.id, {
        verified: true,
      });

      if (!user) next(new ErrorHandler("Invalid token", 400));

      return res.status(200).json({
        success: true,
        message: "Account verified successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

// handle User Sign in
const handleSignin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      if (!body?.email || !body.password)
        next(new ErrorHandler("All fields are required", 400));

      const user = await UserModel.findOne({ email: body.email });

      if (!user) return next(new ErrorHandler("Account not found", 400));

      const isCorrectPassword = bcrypt.compare(body.password, user.password);

      if (!isCorrectPassword)
        return next(new ErrorHandler("Invalid Credentials", 400));

      if (!user.verified) {
        const token = generateActivationToken({
          id: user._id,
          email: user.email,
        });
        const activationUrl = `${process.env.APP_URL}/activate/${token}`;

        await sendMail(
          user.email,
          "Activate Acccount",
          `Hello ${user.name}, click on the link to activate your account ${activationUrl}`
        );

        return res.status(200).json({
          success: true,
          verified: false,
          message: "Verify account",
        });
      }

      const days = body?.remember ? 7 : 1;

      sendToken(user, 200, res, days);
    } catch (error) {
      const err = error as Error;
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

const handleGetUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user?.id;
      const user = await UserModel.findById(id).select("-password");

      if (!user) return next(new ErrorHandler("User deos not exists", 404));

      return res.status(200).json({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

const handleLogout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = { expires: new Date(Date.now()), httpOnly: true };

      return res.status(200).cookie("token", null, options).json({
        success: true,
        message: "Logout successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

export {
  handleSignup,
  handleActivate,
  handleSignin,
  handleGetUser,
  handleLogout,
};
