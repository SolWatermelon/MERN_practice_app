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

  // console.log("isCheckboxSelected", isCheckboxSelected)
  if (isCheckboxSelected) {
    throw new Error("請勾選checkbox");
  }

  console.log("imageItems.length", imageItems?.length);
  console.log("displayedOldPics?.length", displayedOldPics?.length);
  if (!imageItems?.length && !displayedOldPics?.length) {
    throw new Error("請上傳圖片並確認其他欄位有無錯誤");
  }

  // console.log("+formValue.discountPrice > +formValue.regularPrice", +formValue.discountPrice > +formValue.regularPrice)
  if (+formValue.discountPrice > +formValue.regularPrice) {
    throw new Error("discountPrice必須比regularPrice小");
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
  // let checkboxSelected = [];
  // checkboxOptions.forEach((option) => {
  //   const checkboxArr = formValue.options.some((opt) => opt === option);
  //   checkboxSelected.push(checkboxArr);
  // });

  // const isCheckboxSelected = checkboxSelected.every((val) => {
  //   return val === false;
  // });

  // // console.log("isCheckboxSelected", isCheckboxSelected)
  // if (isCheckboxSelected) {
  //   throw new Error("請勾選checkbox");
  // }

  // // console.log("imageItems.length", imageItems.length)
  // if (!imageItems.length) {
  //   throw new Error("請上傳圖片並確認其他欄位有無錯誤");
  // }

  // // console.log("+formValue.discountPrice > +formValue.regularPrice", +formValue.discountPrice > +formValue.regularPrice)
  // if (+formValue.discountPrice > +formValue.regularPrice) {
  //   throw new Error("discountPrice必須比regularPrice小");
  // }

  certainFieldSValidation(checkboxOptions, imageItems, formValue);

  try {
    // console.log("這裡")
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

    // console.log("imageItems", imageItems)
    const imgs = imageItems.map((img) => {
      return { publicID: img.publicId, url: img.url };
    });
    // console.log("imgs", imgs)

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
      // publicId: imgs.map((img) => img.publicID),
      // imageUrls: imgs.map((img) => img.url),
      imageUrls: imgs,
    };

    // console.log("reqData", reqData)
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
  // let checkboxSelected = [];
  // checkboxOptions.forEach((option) => {
  //   const checkboxArr = formValue.options.some((opt) => opt === option);
  //   checkboxSelected.push(checkboxArr);
  // });

  // const isCheckboxSelected = checkboxSelected.every((val) => {
  //   return val === false;
  // });

  // // console.log("isCheckboxSelected", isCheckboxSelected)
  // if (isCheckboxSelected) {
  //   throw new Error("請勾選checkbox");
  // }

  // // console.log("imageItems.length", imageItems.length)
  // if (!imageItems.length) {
  //   throw new Error("請上傳圖片並確認其他欄位有無錯誤");
  // }

  // // console.log("+formValue.discountPrice > +formValue.regularPrice", +formValue.discountPrice > +formValue.regularPrice)
  // if (+formValue.discountPrice > +formValue.regularPrice) {
  //   throw new Error("discountPrice必須比regularPrice小");
  // }
  console.log("這裡1");

  try {
    console.log("這裡2");
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
    // console.log("這裡3");
    const newImgs = imageItems.map((img) => {
      return { publicID: img.publicId, url: img.url };
    });

    // 舊圖片
    // displayedOldPics
    const uploadPics = [...displayedOldPics, ...newImgs];
    // console.log("uploadPics", uploadPics)
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
      // publicId: imgs.map((img) => img.publicID),
      // imageUrls: imgs.map((img) => img.url),
      imageUrls: uploadPics,
    };

    console.log("reqData", reqData);
    const res = await axios.post(`/api/listing/update/${listingId}`, {
      reqData,
    });
    return res.data;
  } catch (e) {
    // 一定要拋出來，錯誤時isError才會抓到
    throw new Error(error.response?.data?.message || "發生未知錯誤");
  }
};
