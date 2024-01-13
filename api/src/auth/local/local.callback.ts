import { Router, Request, Response } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "body-parser";
import { handleLocalCallback } from "../../handlers/handleLocalCallback";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const localCallback: Router = Router();

localCallback.use(cookieParser());
localCallback.use(json(), urlencoded({ extended: true }));

localCallback.get(
  "/auth/local/login",
  passport.authenticate("local", { failureMessage: "Authentication failed" }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.body;
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.json({ error: err });
        }

        req.login(user, (err): void => {
          if (err) return err;
          res.cookie("email", user.email, {
            maxAge: 600000,
            secure: false,
            sameSite: false,
          });
        });

        handleLocalCallback(
          res,
          user.email,
          user.username,
          user.password,
          user.displayName
        );
      });
    } catch (err) {
      console.error("Authentication callback error:", err);
      res.json({ message: "Authentication error", error: err });
    }
  }
);
