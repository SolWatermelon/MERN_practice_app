import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const useListingActions = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();

  //  get all listings mutation
  const getListingMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      if (!data) return;
    },
  });
  return { getListingMutation };
};
