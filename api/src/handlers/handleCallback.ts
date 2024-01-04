import { Response } from "express";
import User from "../models/User";

export async function handleCallback(
  res: Response<any>,
  email: string,
  id: string,
  name: string
): Promise<void> {
  const user = User.findOne({ email: email });
  if (await user) {
    res.redirect("/auth/google/success");
    return;
  }

  const newUser = new User({
    email: email,
    googleId: id,
    name: name,
  });

  newUser.save();
  res.redirect("/auth/google/success");
}