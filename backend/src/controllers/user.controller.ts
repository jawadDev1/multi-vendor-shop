import asyncHandler from "#middleware/asyncHandler.js";
import { ErrorHandler } from "#utils/ErrorHandle.js";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IUserBody } from "#types/controllers.js";
import { UserModel } from "#models/user.model.js";
import { sanitizeUser, validateBody } from "#utils/index.js";
import { generateActivationToken, sendToken, verifyToken } from "#utils/jwt.js";
import { sendMail } from "#utils/sendmail.js";
import mongoose from "mongoose";
import { ShopModel } from "#models/shop.model.js";

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
      const alreadyExists = await UserModel.findOne({ email: body.email });

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

      if (!body?.email || !body?.password)
        next(new ErrorHandler("All fields are required", 400));

      const user = await UserModel.findOne({ email: body.email });

      if (!user) return next(new ErrorHandler("Account not found", 400));

      const isCorrectPassword = await bcrypt.compare(
        body.password,
        user.password
      );

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
      const user = await UserModel.findById(id).select(
        "-password -reset_password_time -reset_password_token"
      );

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

const handleUpdateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const isValid = validateBody(body);

      if (!isValid) {
        return next(new ErrorHandler("Invalid field values", 400));
      }

      const user = await UserModel.findOneAndUpdate(
        { email: body.email },
        body,
        { new: true }
      ).select("-password");

      if (!user) {
        return next(new ErrorHandler("Invalid user", 400));
      }

      return res.status(200).json({
        success: true,
        message: "profile updated successfully",
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

// Handle Create the user address
const handleCreateAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const isValid = validateBody(body);

      if (!isValid) {
        return next(new ErrorHandler("Invalid field values", 400));
      }

      if (!req.user) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      const alreadyExists = req.user.addresses.find(
        (addr) => addr.address_type === body.address_type
      );

      if (alreadyExists) {
        return next(new ErrorHandler("Address already exists", 400));
      }

      req.user.addresses.push(body);

      await req.user.save();

      return res.status(200).json({
        success: true,
        message: "address created successfully",
        data: req.user,
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

// Handle Update the user address
const handleUpdateAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const isValid = validateBody(body);

      if (!isValid) {
        return next(new ErrorHandler("Invalid field values", 400));
      }

      if (!req.user) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      const address = req.user.addresses.find(
        (addr) => addr._id && addr._id.equals(id)
      );

      if (!address) {
        return next(new ErrorHandler("Address not found", 404));
      }

      const { country, city, address1, address2, zip_code, address_type } =
        body;

      const user = await UserModel.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            "addresses.$[elem].country": country,
            "addresses.$[elem].city": city,
            "addresses.$[elem].address1": address1,
            "addresses.$[elem].address2": address2,
            "addresses.$[elem].address_type": address_type,
            "addresses.$[elem].zip_code": zip_code,
          },
        },
        {
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(id) }],
          new: true,
        }
      ).select("-password -reset_password_time -reset_password_token");

      return res.status(200).json({
        success: true,
        message: "address updated successfully",
        data: user,
      });
    } catch (error) {
      console.log("Error handleUpdateAddress :: ", error);
      return next(new ErrorHandler("something went wrong", 500));
    }
  }
);

const handleDeleteAddress = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        return next(new ErrorHandler("Unauthorized", 401));
      }

      const address = req.user.addresses.find(
        (addr) => addr._id && addr._id.equals(id)
      );

      if (!address) {
        return next(new ErrorHandler("Address not found", 404));
      }

      const user = await UserModel.findByIdAndUpdate(
        { _id: req.user.id },
        {
          $pull: {
            addresses: { _id: new mongoose.Types.ObjectId(id) },
          },
        },
        { new: true }
      ).select("-password -reset_password_time -reset_password_token");

      return res.status(200).json({
        success: true,
        message: "address deleted successfully",
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error as string, 500));
    }
  }
);

const handleChangePassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const isCorrectPassword = await bcrypt.compare(
        body.old_password,
        req.user?.password!
      );

      if (!isCorrectPassword) {
        return next(new ErrorHandler("Invalid password", 400));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.new_password, salt);

      const user = await UserModel.findByIdAndUpdate(
        req.user?.id,
        {
          password: hashedPassword,
        },
        { new: true }
      ).select("-password -reset_password_time -reset_password_token");

      return res.status(200).json({
        success: true,
        message: "password updated successfully",
        data: user,
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
  handleUpdateUserProfile,
  handleCreateAddress,
  handleDeleteAddress,
  handleUpdateAddress,
  handleChangePassword,
};
