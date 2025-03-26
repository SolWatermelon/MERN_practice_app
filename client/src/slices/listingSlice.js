import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allListings: [],
  filteredListing:[]
};

export const listingSlice = createSlice({
  name: "listingSlice",
  initialState,
  // reducers ⇒ store接收到action要做的處理，意即邏輯(action通常包含type和payload，但這兩toolkit會自動生成，因此此處只需要寫邏輯)
  reducers: {
    // 參數1 state: toolkit會把當下的state傳入(initialState)
    // 參數2 action: 對應的動作
    acquireAllListings: (state, action) => {
        state.allListings = action.payload;
    },

    filteredAllListings: (state, action) => {
        state.filteredListing = action.payload;
    },
  },
});

// export action!
export const { acquireAllListings, filteredAllListings } = listingSlice.actions;
// export reducer!
// createSlice 會把 reducers 內的函式合併成一個 reducer，這樣store才可以使用他
export default listingSlice.reducer;
