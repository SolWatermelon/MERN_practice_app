import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
dotenv.config();
const app = express()

mongoose.connect(process.env.MONGODB).then(() => {
console.log("connected to mongoDB!");
}).catch((e) => {
    console.log("failed to connect to mongoDB:", e);
})


app.use("/api/user", userRouter)


app.listen(3000, () => {
console.log("server is running on PORT 3000");
})