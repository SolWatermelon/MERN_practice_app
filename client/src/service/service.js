import axios from "axios";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

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

export const createListingForm = async (
  formValue,
  imageItems,
  _id,
  checkboxOptions
) => {
  let checkboxSelected = [];
  checkboxOptions.forEach((option) => {
    const checkboxArr = formValue.options.some((opt) => opt === option);
    checkboxSelected.push(checkboxArr);
  });

  const isCheckboxSelected = checkboxSelected.every((val) => {
    return val === false;
  });
  if (isCheckboxSelected) {
    throw new Error("請勾選checkbox");
  }

  if (!imageItems.length) {
    throw new Error("請上傳圖片並確認其他欄位有無錯誤");
  }
  if (+formValue.discountPrice > +formValue.regularPrice) {
    throw new Error("discountPrice必須比regularPrice小");
  }

  try {
  const {
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathrooms,
    bedrooms,
    options,
  } = formValue;

  const imgs = imageItems.map((img) => {
    return img.url
  });

  const reqData = {
    userRef: _id,
    name,
    description,
    address,
    regularPrice,
    discountPrice,
    bathrooms,
    bedrooms,
    offer: options.some((option) => option === "offer"),
    parking: options.some((option) => option === "parking"),
    furnished: options.some((option) => option === "furnished"),
    type: options.includes("sell") ? "sell" : "rent",
    imageUrls: imgs,
  };
    const res = await axios.post("/api/listing/create", {
      reqData
  });
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(error.response?.data?.message || "發生未知錯誤");
  }
};
