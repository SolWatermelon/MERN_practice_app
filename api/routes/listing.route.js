import express from "express";
const router = express.Router();
import { createListing, createListingPics } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

router.post("/create", verifyUserToken, createListing);
router.post("/create/pics", verifyUserToken, createListingPics);
export default router;
