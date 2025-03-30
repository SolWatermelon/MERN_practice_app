import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allListings: [],
  filteredListing:[]
};

export const listingSlice = createSlice({
  name: "listingSlice",
  initialState,
  reducers: {
    acquireAllListings: (state, action) => {
        state.allListings = action.payload;
    },

    filteredAllListings: (state, action) => {
        state.filteredListing = action.payload;
    },
  },
});

export const { acquireAllListings, filteredAllListings } = listingSlice.actions;
export default listingSlice.reducer;
