import express from "express";
const router = express.Router();
import { createListing, createListingPics, deleteListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

router.post("/create", verifyUserToken, createListing);
router.post("/create/pics", verifyUserToken, createListingPics);
router.post("/delete/:id", verifyUserToken, deleteListing);
export default router;
