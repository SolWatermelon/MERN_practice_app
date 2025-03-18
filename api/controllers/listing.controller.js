import Listing from "../models/listing.model.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json(listing);
  } catch (e) {}
};

export const createListingPics = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  try {
    const { _id, username, avatar, email, createdAt, updatedAt, base64Images } =
      req.body;

    const allPicturesInfo = await Promise.allSettled(
      base64Images.map((base64ImagesURL) => {
        return cloudinary.v2.uploader.upload(base64ImagesURL);
      })
    );


    console.log("~~~~allPicturesInfo!!!!!!", allPicturesInfo)

    // secure_url、public_id
    const listingPicsPublicID = allPicturesInfo.map((res) => {
      return res.value.public_id;
    });
    const listingPicsSecureURL = allPicturesInfo.map((res) => {
      return res.value.secure_url;
    });

    return res.status(200).json({
      _id,
      username,
      email,
      listingPicsPublicID,
      listingPicsSecureURL,
    });
  } catch (e) {
    next(e);
  }
};
