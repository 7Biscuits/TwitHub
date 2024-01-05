import express, { Express, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { connect } from "mongoose";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.router";
import { configDotenv } from "dotenv";

configDotenv();

connect(`${process.env.MONGO_URI}`).then((): void => {
  console.log("Connected to database");
});

const app: Express = express();

app.use(express.json());

app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(json(), urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_: Request, res: Response): void => {
  res.status(200).send("Welcome to TwitHub API");
});

app.use(authRouter);

const port = process.env.PORT || 8080;

app.listen(port, (): void => {
  console.log(`server listening on http://localhost:${port}`);
});