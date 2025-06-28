import { ErrorHandler } from "#utils/ErrorHandle.js";
import { NextFunction, Request, Response } from "express";

const handleError = (
  err: Error & { statusCode: number; code?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = "Resources not found with this id. Invalid ";
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err?.code == 11000) {
    const message = "Duplicate key error ";
    console.log("err =======+> ", err);
    err = new ErrorHandler(message, 400);
  }

  //   Jsonwebtoken error
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid url try again";
    err = new ErrorHandler(message, 400);
  }

  //  token expired error
  if (err.name === "TokenExpiredError") {
    const message = "token is expired";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default handleError;
