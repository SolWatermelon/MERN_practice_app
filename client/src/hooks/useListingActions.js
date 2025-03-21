import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const useListingActions = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();
  const [userListings, setUserListings] = useState([]);
  const [perUserListings, setPerUserListings] = useState([]);

  //  get per listing mutation
  const getPerListingMutation = useMutation({
    mutationFn: async (listingId) => {
      try {
        console.log("listingId", listingId);
        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        console.log('res.data.listings', res.data.listings);
        if(!res.data.listings.length)  throw new Error("無法抓取資料");
        const perListing = res.data.listings.find((listing) => {
          return listing._id ===listingId
        })
        return perListing
      } catch (error) {
        return error.message
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      setPerUserListings(data);
      if (!data) return;
      // setGetUserListings(data)
    },
  });

  //  get all listings mutation
  const getListingMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        return res.data.listings;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      setUserListings(data);
      if (!data) return;
      // setGetUserListings(data)
    },
  });

  // listing deletion mutation
  const deleteListingMutation = useMutation({
    mutationFn: async ({ imageUrls, _id }) => {
      console.log("imageUrls", imageUrls);
      console.log("_id", _id);
      try {
        const res = await axios.post(`/api/listing/delete/${_id}`, {
          imageUrls,
        });
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  return {
    getListingMutation,
    getPerListingMutation,
    deleteListingMutation,
    userListings,
    setUserListings,
    perUserListings, setPerUserListings
  };
};
