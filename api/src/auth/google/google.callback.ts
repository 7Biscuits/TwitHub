import { Router, Request, Response } from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { handleCallback } from "../../handlers/handleGoogleCallback";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

const googleCallback: Router = Router();

googleCallback.use(cookieParser());

googleCallback.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

googleCallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res): Promise<void> {
    try {
      const user = req.user as any;
      req.session.regenerate(function (err): void {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.redirect("/login");
        }

        // const session = req.session as any;
        // session.email = user.emails[0].value;
        // session.userId = user.id;
        // session.displayName = user.displayName;

        const cookieOptions = {
          maxAge: 600000,
          secure: false,
          sameSite: false,
        };

        res.cookie("email", user.emails[0].value, cookieOptions);
        handleCallback(res, user.emails[0].value, user.id, user.displayName);
      });
    } catch (err) {
      console.error("Authentication callback error:", err);
      res.redirect("/login");
    }
  }
);

googleCallback.get("/auth/google/success", isAuthenticated, (req: Request, res: Response): void => {
  res.send(`User authorized, ${req.cookies.email}`);
});

export { googleCallback };