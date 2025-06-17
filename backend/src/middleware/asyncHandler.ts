import { Request, Response, NextFunction } from "express";

const asyncHandler =
  (func: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

export default asyncHandler;
