import express from "express";
const router = express.Router();
import { createListing, createListingPics, deleteListing, updateListing, getUnverifiedListing, getAllListings } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

router.post("/create", verifyUserToken, createListing);
router.post("/create/pics", verifyUserToken, createListingPics);
router.post("/delete/:id", verifyUserToken, deleteListing);
router.post("/update/:id", verifyUserToken, updateListing);
router.get("/get/:id", getUnverifiedListing);
router.get("/getAllListing", getAllListings);
export default router;
