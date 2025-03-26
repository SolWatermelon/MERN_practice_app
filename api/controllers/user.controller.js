import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js"

export const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "u can only update ur own account"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // $set: {
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  // check token first
  // 記得user id是從verify user來的~
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "u can only delete ur own account"))
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    return res.status(200).json({ msg: "user has been deleted" });
  } catch (e) {
    next(e);
  }
};


export const getUserListing =  async (req, res, next) => {
  // check token first
  // 記得user id是從verify user來的(cookie)
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "u can only get ur own listings"))
  try {
    const listings = await Listing.find({userRef: req.params.id})
    return res.status(200).json({ msg: "success", listings });
  } catch (e) {
    next(e);
  }
};


export const getUser =  async (req, res, next) => {
  // check token first
  // 記得user id是從verify user來的(cookie)
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(errorHandler(401, "user not found"))
    const { password: pwd, ...rest } = user;
    return res.status(200).json(rest);
  } catch (e) {
    next(e);
  }
};
