import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000"

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
      username:name,
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
