import express from "express";
import {
  signup,
  signin,
  googleSignin,
  signout,
} from "../controllers/auth.controller.js";
// import { signin } from "../controllers/auth.controller.js";
// import { googleSignin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleSignin);
router.get("/signout", signout);

export default router;
