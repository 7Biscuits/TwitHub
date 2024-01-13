import passport from "passport";
import { Strategy } from "passport-local";
import { compare } from "bcrypt";
import User from "../../models/User";
import { configDotenv } from "dotenv";

configDotenv();

export const initLocal = (): void => {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      async function (username: string, password: string, done): Promise<void> {
        const user = await User.findOne({ username: username });
        if (!user) return done(null, false, { message: "Invalid Username" });

        const validPassword = await compare(password, user.password);
        if (validPassword) return done(null, user);
        else return done(null, false, { message: "Invalid Password" });
      }
    )
  );

  passport.serializeUser((user, done): void => {
    done(null, user);
  });

  passport.deserializeUser((id, done): void => {
    const user = User.findById(id);
    done(null, user);
  });
};