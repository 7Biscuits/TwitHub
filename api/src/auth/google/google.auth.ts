import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../../models/User";
import { configDotenv } from "dotenv";

configDotenv();

export const initGoogle = (): void => {
  passport.use(
    new Strategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_SECRET}`,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      (_: any, __: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done): void => {
    done(null, user);
  });

  passport.deserializeUser((id, done): void => {
    const user = User.findById(id);
    if (user) done(null, user);
  });
}