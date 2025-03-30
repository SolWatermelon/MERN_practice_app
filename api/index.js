import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import avatarRouter from "./routes/avatar.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";
// import cors from "cors";

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

app.use(express.json({ limit: "50mb" })); // 允許最大10MB JSON資料
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:5173", // 前端網址
//   credentials: true // 允許發送Cookie
// }));
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/avatar", avatarRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

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
