import { Router } from "express";
import session from "express-session";
import { json } from "body-parser";
import { initGoogle } from "../auth/google/google.auth";
import { googleCallback } from "../auth/google/google.callback";
import { configDotenv } from "dotenv";

configDotenv();

export const authRouter: Router = Router();

initGoogle();

authRouter.use(json());
authRouter.use(googleCallback);
authRouter.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: false, maxAge: 600000 },
  })
);