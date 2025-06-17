import { Document } from "mongoose";


export interface IUser extends Document {
    name: string,
    email : string,
    password: string,
    profile: string,
    role: string,
    verified: boolean
};