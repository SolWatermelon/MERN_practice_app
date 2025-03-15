import express from "express";
import { avatarUpload } from "../controllers/avatar.controller.js";
const router = express.Router()




router.post("/upload", avatarUpload)
// router.post("/update", avatarUpdate)


export default router