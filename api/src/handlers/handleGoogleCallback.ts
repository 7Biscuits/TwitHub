import { Response } from "express";
import User from "../models/User";

export async function handleCallback(
  res: Response<any>,
  email: string,
  id: string,
  name: string
): Promise<void> {
  const user = await User.findOne({ email: email });

  if (user) {
    if (user?.source != "google") {
      res.redirect("/login");
      console.log("Different source of authentication");
      return;
    }
    res.redirect("/auth/google/success");
    return;
  }

  const newUser = new User({
    email: email,
    googleId: id,
    name: name,
    source: "google",
  });

  newUser.save();
  res.redirect("/auth/google/success");
}