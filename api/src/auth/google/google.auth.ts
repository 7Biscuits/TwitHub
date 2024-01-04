import { serializeUser, deserializeUser, use } from "passport";
import { Strategy } from "passport-google-oauth20";
import { configDotenv } from "dotenv";

configDotenv();

export function initGoogle() {
  serializeUser(function (user, done) {
    done(null, user);
  });

  deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  
  use(
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
      async (_: any, __: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );
}