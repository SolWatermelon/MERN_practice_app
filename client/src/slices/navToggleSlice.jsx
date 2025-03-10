import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

export const navToggleSlice = createSlice({
  name: "navToggleSlice",
  initialState,
  // reducers ⇒ store接收到action要做的處理，意即邏輯(action通常包含type和payload，但這兩toolkit會自動生成，因此此處只需要寫邏輯)
  reducers: {
    // 參數1 state: toolkit會把當下的state傳入(initialState)
    // 參數2 action: 對應的動作(toggleMenu就代表這action，然後這action之後會再用另外一個方式export出來)
    toggleMenu: (state, action) => {
      state.isOpened = !state.isOpened;
    },
  },
});

// export action!
export const { toggleMenu } = navToggleSlice.actions;
// export reducer!
// createSlice 會把 reducers 內的函式合併成一個 reducer，這樣store才可以使用他
export default navToggleSlice.reducer;
