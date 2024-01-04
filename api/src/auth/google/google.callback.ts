import { Router } from "express";
import passport from "passport";
import { handleCallback } from "../../handlers/handleCallback";

const googleCallback: Router = Router();

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
  // async function (req, res) {
  //   const user = req.user as any;
  //   res.cookie("email", user.emails[0].value, {
  //     maxAge: 600000,
  //     secure: true,
  //     sameSite: false,
  //   });
  //   handleCallback(res, user.emails[0].value, user.id, user.displayName);
  // }
);

googleCallback.get("/auth/google/success", (_, res) => {
  res.send("User authorized");
});

export { googleCallback };