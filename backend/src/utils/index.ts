import { Document } from "mongoose";

export const sanitizeUser = (user: Document) => {
  return { ...user, password: "", _id: "" };
};

export const validateBody = (body: { [key: string]: any }) => {
  return Object.values(body).every((val) => val !== undefined && val !== null);
};

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll(/[&,%,$,-,(,)]/g, "")
    .replaceAll(/\s+/g, "-")
    .trim();
};
