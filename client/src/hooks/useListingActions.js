import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const useListingActions = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();

  //  get all listings mutation
  const getListingMutation = useMutation({
    mutationFn: async (setUserListings) => {
      try {
        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        setUserListings(res.data.listings);
        return res.data.listings;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
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
    // onSuccess: (data) => {

    //   // dispatch(deleteUserSuccess(data));
    // }
  });

  return { getListingMutation, deleteListingMutation };
};
