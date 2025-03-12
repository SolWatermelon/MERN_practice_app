import axios from "axios";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
// import { googleSignIn } from "../service/service.js";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getUser = async () => {
  try {
    const res = await axios.get("/posts");
    return res.data;
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
    } else {
      throw new Error(e.message);
    }
  }
};

export const signUp = async (data) => {
  const { name, email, password } = data;
  try {
    const res = await axios.post("/api/auth/signup", {
      username: name,
      email,
      password,
    });

    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(e.message);
  }
};

export const signIn = async (data) => {
  const { email, password } = data;
  try {
    const res = await axios.post("/api/auth/signin", {
      email,
      password,
    });
    // console.log("res.data:",res.data)
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(e.message);
  }
};

export const googleSignIn = async () => {
  // console.log("data:", data);
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    console.log("result:", result);
    const userInfo = {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL,
    };
    const res = await axios.post("/api/auth/google", userInfo);
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(e.message);
  }
};
