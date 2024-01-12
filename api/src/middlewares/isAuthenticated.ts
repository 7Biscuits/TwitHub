import { Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  // if (req.isAuthenticated()) return next();
  if (req.cookies.email) return next();
  res.status(400).json({ message: "User not authenticated" });
};