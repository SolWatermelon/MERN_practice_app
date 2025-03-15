import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import avatarRouter from "./routes/avatar.route.js";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected to mongoDB!");
  })
  .catch((e) => {
    console.log("failed to connect to mongoDB:", e);
  });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" })); // 允許最大 10MB JSON 數據
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/avatar", avatarRouter);

// error handing middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server is running on PORT 3000");
});









