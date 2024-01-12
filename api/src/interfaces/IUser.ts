import { Types } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  source: string;
  googleId: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  twits: Types.ObjectId[];
}