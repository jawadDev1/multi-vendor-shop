import { IUser } from "./models.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // or your custom type
    }
  }
}
