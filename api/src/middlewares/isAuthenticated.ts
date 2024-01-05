import { Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  if (req.isAuthenticated()) {
    console.log(`isAuthenticated`);
    return next();
  }
  console.log("is not authenticated");
  res.redirect("/login");
};