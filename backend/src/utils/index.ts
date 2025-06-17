import { Document } from "mongoose";

export const sanitizeUser = (user: Document) => {
  return { ...user, password: "", _id: "" };
};
