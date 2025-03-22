import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateRandomPassword = (length = 12) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  const randomValues = new Uint32Array(length);
  crypto.randomFillSync(randomValues);
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  return password;
};

const generateTokenAndStoreIt = (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  const { password: pwd, ...rest } = user._doc;
  return res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json(rest);
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // hashSync
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "新增資料成功" });
  } catch (e) {
    next(e);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email }).exec();
    // 使用自定義的middleware
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    generateTokenAndStoreIt(validUser, res);
  } catch (e) {
    next(e);
  }
};

export const googleSignin = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;
    const validUser = await User.findOne({ email }).exec();
    if (!validUser) {
      // password is required!!!!!!!!!! so we have to create a new one
      const pwds = generateRandomPassword();
      const hashedPassword = bcryptjs.hashSync(pwds, 10);
      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() + generateRandomPassword(),
        email,
        avatar: photo,
        password: hashedPassword,
      });
      await newUser.save();
      generateTokenAndStoreIt(newUser, res);
    } else {
      generateTokenAndStoreIt(validUser, res);
    }
  } catch (e) {
    next(e);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ msg: "user has been logged out" });
  } catch (e) {
    next(e);
  }
};
