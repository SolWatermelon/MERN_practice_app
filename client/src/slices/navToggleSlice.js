import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

export const navToggleSlice = createSlice({
  name: "navToggleSlice",
  initialState,
  reducers: {
    toggleMenu: (state, action) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export const { toggleMenu } = navToggleSlice.actions;
export default navToggleSlice.reducer;
