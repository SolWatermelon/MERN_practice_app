import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // 參數1 state: toolkit會把當下的state傳入(initialState)
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

// export action!
export const { signInSuccess, updateUserSuccess, deleteUserSuccess, signOutUserSuccess } = userSlice.actions;
// export reducer!
// createSlice 會把 reducers 內的函式合併成一個 reducer，這樣store才可以使用他
export default userSlice.reducer;
