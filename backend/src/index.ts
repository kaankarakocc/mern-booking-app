import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute";
import authRouter from "./Routes/authRoute";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
