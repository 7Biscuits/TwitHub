import { Schema, Types, model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserModel: Schema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: false,
  },

  source: {
    type: String,
    required: true,
  },

  googleId: {
    type: String,
    required: false,
  },

  name: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    trim: true,
  },

  profilePicture: {
    type: String,
  },

  followers: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],

  twits: [
    {
      type: Types.ObjectId,
      ref: 'Twit',
    },
  ],
});

UserModel.virtual("FollowerCount").get(function (): number {
  return this.followers.length;
});

UserModel.virtual("FollowingCount").get(function (): number {
  return this.following.length;
});

UserModel.virtual("TwitCount").get(function (): number {
  return this.twits.length;
});

export default model<IUser>("User", UserModel);