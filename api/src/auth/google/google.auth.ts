import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { configDotenv } from "dotenv";

configDotenv();

export function initGoogle(): void {
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

  passport.serializeUser(function (user, done): void {
    done(null, user);
  });

  passport.deserializeUser(function (user, done): void {
    done(null, user as any);
  });
}