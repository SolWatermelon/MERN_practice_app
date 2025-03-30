import express from "express";
import {
  updateUserInfo,
  deleteUser,
  getUserListing,
  getUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUserToken, updateUserInfo);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.get("/listings/:id", verifyUserToken, getUserListing);
router.get("/:id", verifyUserToken, getUser);

export default router;
