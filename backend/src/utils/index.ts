import { Document } from "mongoose";

export const sanitizeUser = (user: Document) => {
  return { ...user, password: "", _id: "" };
};

export const validateBody = (body: { [key: string]: any }) => {
  return Object.values(body).every((val) => val !== undefined && val !== null);
};
