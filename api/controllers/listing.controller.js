import Listing from "../models/listing.model.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body.reqData);
    return res.status(200).json(listing);
  } catch (e) {
    next(e);
  }
};

export const createListingPics = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const { _id, username, avatar, email, createdAt, updatedAt, pendingItems } =
      req.body;

    const uploadListingPics = await Promise.allSettled(
      pendingItems.map((base64Image) => {
        return cloudinary.v2.uploader.upload(base64Image.base64, {
          public_id: `listing-${base64Image.id}`,
        });
      })
    );

    const picsMainInfo = uploadListingPics.map((info) => {
      return {
        listingPicsPublicID: info.value.public_id,
        listingPicsSecureURL: info.value.secure_url,
      };
    });

    return res.status(200).json({
      _id,
      username,
      email,
      picsMainInfo,
    });
  } catch (e) {
    next(e);
  }
};

export const deleteListing = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "listing not found"));
  if (listing.userRef !== req.user.id) {
    return next(errorHandler(401, "u can only delete your own listing"));
  }

  try {
    const { imageUrls } = req.body;
    console.log("Deleting images:", imageUrls);
    const deletingImgs = imageUrls.map((url) => {
      return cloudinary.v2.uploader.destroy(`${url.publicID}`);
    });
    await Promise.allSettled(deletingImgs);

    const deletedListing = await Listing.findByIdAndDelete(req.params.id)

    if (!deletedListing) {
      return res.status(404).json({ message: "listing can not be deleted" });
    }
    return res.status(200).json({ msg: "listing has been deleted" });
  } catch (e) {
    console.error("Error in deleteListing:", e);
    next(e);
  }
};

export const updateListing = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const { imageUrls } = req.body.reqData;
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "listing not found"));
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(404, "u can only update ur own listing"));
  }
  try {
    const deletingImgs = imageUrls.map((url) => {
      return cloudinary.v2.uploader.destroy(`${url.publicID}`);
    });

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body.reqData,
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "listing can not be updated" });
    }
    return res.status(200).json(updatedListing);
  } catch (e) {
    next(e);
  }
};

export const getUnverifiedListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "listing can not be found" });
    }
    return res.status(200).json({ msg: "success", listing });
  } catch (e) {
    next(e);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const allListings = await Listing.find({}).exec();
    if (!allListings) {
      return res.status(404).json({ message: "listings can not be found" });
    }
    return res.status(200).json({ msg: "success", allListings });
  } catch (e) {
    next(e);
  }
};
