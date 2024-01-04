import { Schema, Types, model } from "mongoose";
import { ITwit } from "../interfaces/ITwit";

const TwitModel = new Schema<ITwit>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      // maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    // reTwits: [
    //   {
    //     type: Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    replies: [
      {
        type: Types.ObjectId,
        ref: "Twit",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

TwitModel.virtual("likesCount").get(function (this: ITwit) {
  return this.likes.length;
});

TwitModel.virtual("repliesCount").get(function (this: ITwit) {
  return this.replies.length;
});

export const Twit = model<ITwit>("Twit", TwitModel);