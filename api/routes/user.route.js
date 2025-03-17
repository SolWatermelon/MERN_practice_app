import express from "express";
// import { test } from "../controllers/user.controller.js";
import { updateUserInfo, deleteUser } from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";
// import {deleteUser} from "../controllers/user.controller.js"

const router = express.Router();

// router.get("/test", test)
router.post("/update/:id", verifyUserToken, updateUserInfo);
router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
