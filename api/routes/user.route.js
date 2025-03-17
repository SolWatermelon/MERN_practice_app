import express from "express";
// import { test } from "../controllers/user.controller.js";
import { updateUserInfo } from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router()

// router.get("/test", test)
router.post("/update/:id",verifyUserToken, updateUserInfo)


export default router