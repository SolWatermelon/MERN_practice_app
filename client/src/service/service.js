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
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(e.message);
  }
};

const certainFieldSValidation = (
  checkboxOptions,
  imageItems,
  formValue,
  displayedOldPics
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

  if (!imageItems?.length && !displayedOldPics?.length) {
    throw new Error("請上傳圖片並確認其他欄位有無錯誤");
  }

  if (+formValue.discountPrice > +formValue.regularPrice) {
    throw new Error("discountPrice必須比regularPrice小");
  }
};

export const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
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

  certainFieldSValidation(checkboxOptions, imageItems, formValue);

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
      return { publicID: img.publicId, url: img.url };
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
      reqData,
    });
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(error.response?.data?.message || "發生未知錯誤");
  }
};

export const updateListingForm = async (
  formValue,
  displayedOldPics,
  imageItems,
  _id,
  listingId,
  checkboxOptions
) => {
  certainFieldSValidation(
    checkboxOptions,
    imageItems,
    formValue,
    displayedOldPics
  );

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

    // 新圖片
    const newImgs = imageItems.map((img) => {
      return { publicID: img.publicId, url: img.url };
    });

    // 舊圖片
    // displayedOldPics
    const uploadPics = [...displayedOldPics, ...newImgs];
    const reqData = {
      listingId,
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
      imageUrls: uploadPics,
    };

    const res = await axios.post(`/api/listing/update/${listingId}`, {
      reqData,
    });
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(error.response?.data?.message || "發生未知錯誤");
  }
};
