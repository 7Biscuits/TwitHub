import { Types } from "mongoose";

export interface ITwit {
  content: string;
  createdAt: Date;
  likes: Types.ObjectId[];
  // reTwits: Types.ObjectId[];
  replies: Types.ObjectId[];
}