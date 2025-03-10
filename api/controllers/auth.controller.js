import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

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
    next(e)
  }
};


export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
     const validUser = await User.findOne({email}).exec()
     // 使用自定義的middleware
     if(!validUser) return next(errorHandler(404, "user not found"))
     const validPassword = bcryptjs.compareSync(password, validUser.password)
     if(!validPassword) return next(errorHandler(401, "wrong credentials"))

     const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
     const {password:pwd, ...rest} = validUser;
    //  comsole.log("validUser_docvalidUser_doc", validUser_doc)
    //  , expires: 
    return res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest)
  } catch (e) {
    next(e)
  }
};
