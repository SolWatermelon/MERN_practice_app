import express from "express";
const router = express.Router();
import { createListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

router.post("/create", verifyUserToken, createListing);
export default router;
