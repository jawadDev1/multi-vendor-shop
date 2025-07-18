import { Document,  } from "mongoose";

export const sanitizeUser = (user: Document) => {
  return { ...user, password: "", _id: "" };
};

export const validateBody = (body: { [key: string]: any }) => {
  return Object.values(body).every((val) => val !== undefined && val !== null);
};

// Generate Slug from title
export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replaceAll(/[&,%,$,-,(,)]/g, "")
    .replaceAll(/\s+/g, "-")
    .trim();
};

// Generate Random string for unique slug
export const generateRandomString = (length: number = 5) => {
  let str = "a1b2cdefgh3ij4klmn456op78qrs90t23uv2w9x9y239z";
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * str.length - 1);
    randomStr = randomStr + str[index];
  }

  return randomStr;
};

export const validateOrderBody = (body: { [key: string]: unknown }) => {
  if (!Array.isArray(body.cart) || body.cart.length === 0) {
    return false;
  } else if (!body.shipping_address) {
    return false;
  }

  return Object.values(body).every((val) => val !== undefined && val !== null);
};


export const sanitizeMongoObject = (obj: Document ) => {
  return {...obj.toObject(), _id: "", updatedAt: ""};
}