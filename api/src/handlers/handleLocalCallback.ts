import { Response } from "express";
import User from "../models/User";

export async function handleLocalCallback(
  res: Response<any>,
  email: string,
  username: string,
  password: string,
  displayName: string
): Promise<void> {
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    const newUser = new User({
      username: username,
      password: password,
      displayName: displayName,
    });

    newUser.save();
  }

  res.redirect("/auth/local/success");
}