import Listing from "../models/listing.model.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
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
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  try {
    const id = req.params.id;
    // console.log("id", id);
    const { imageUrls } = req.body;
    // console.log("req.body",req.body)
    console.log("imageUrls", imageUrls);

    if (!id) return next(errorHandler(404, "listing not found"));
    if (req.user.id !== id)
      return errorHandler(401, "u can only delete ur own listing");

    const deletingImgs = imageUrls.map((url) => {
      return cloudinary.v2.uploader.destroy(`${url.publicID}`);
    });
    const deletingImgsResult = await Promise.allSettled(deletingImgs);

    const updatedUser = await Listing.findByIdAndDelete(id);

    if (!updatedUser) {
      return res.status(404).json({ message: "listing can not be deleted" });
    }
    return res.status(200).json({ msg: "listing has been deleted" });
  } catch (e) {
    next(e);
  }
};
