import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config();
import User from "../models/user.model.js";

export const avatarUpload = async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  try {
    const { _id, username, email, createdAt, updatedAt, base64Image } =
      req.body;

    // Upload an image
    // POST https://api.cloudinary.com/v1_1/demo/image/upload

    if(_id){
      const deleteAvatar = await cloudinary.v2.uploader.destroy(
        `avatarphoto_${_id}`
      );
      // console.log("deleteAvatar", deleteAvatar);
    }


    const uploadResult = await cloudinary.v2.uploader
      .upload(base64Image, {
        public_id: `avatarphoto_${_id}`,
      })
      .catch((error) => {
        console.log(error);
      });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("avatarphoto", {
      fetch_format: "auto",
      quality: "auto",
    });

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("avatarphoto", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log("uploadResult!!!!!!", uploadResult);

  
    // ==============================================


    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { 
        avatar:uploadResult.secure_url,
        updatedAt: new Date() 
      },
      { new: true }
    );

    console.log("updatedUser:", updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User avatar can not be update" });
    }

    // const aa = {secure_url: uploadResult.secure_url, ...updatedUser}
    // console.log("aa:", aa)
    // const bb = {...updatedUser, secure_url: uploadResult.secure_url,}
    // console.log("bb:", bb)
    // return res.json(uploadResult);
    return res.json({secure_url: uploadResult.secure_url, ...updatedUser});
  } catch (e) {
    next(e);
  }
};

export const avatarUpdate = async () => {
  try {
  } catch (e) {}
};
