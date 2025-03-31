import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { acquireAllListings } from "@/slices/listingSlice.js";
import toast from "react-hot-toast";

export const useListingActions = (listingId) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const getVerifiedPerListQuery = useQuery({
    queryKey: ["perVerifiedListing", listingId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      if (!id || !currentUser?._id) {
        console.log("Missing id or currentUser._id:", {
          id,
          userId: currentUser?._id,
        });
        return null;
      }
      const res = await axios.get(`/api/user/listings/${currentUser._id}`);
      return res.data.listings.find((listing) => listing._id === id) || null;
    },
    enabled: !!currentUser?._id && !!listingId, // 變數存在才執行
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  //  get per listing query(unverified)
  const getUnverifiedPerListQuery = useQuery({
    queryKey: ["perUnverifiedListing", listingId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      console.log("id", id);
      console.log("currentUser?._id", currentUser?._id);
      if (!id || !currentUser?._id) return null;
      const res = await axios.get(`/api/listing/get/${listingId}`);
      return res.data.listing || null;
    },
    enabled: !!currentUser?._id && !!listingId, // 變數存在才執行
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  const getCertainUserAllListingsQuery = useQuery({
    queryKey: ["certainUserAllListings"],
    queryFn: async () => {
      if (!currentUser?._id) return null;
      const res = await axios.get(`/api/user/listings/${currentUser._id}`);
      return res.data.listings || null;
    },
    enabled: !!currentUser?._id, // 變數存在才執行
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  const getAllListingsQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      const res = await axios.get(`/api/listing/getAllListing`);
      return res.data || null;
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  const refetchAllListingsQuery = async () => {
    try {
      const res = await getAllListingsQuery.refetch();
      console.log("res", res);
      if (res.isSuccess) {
        console.log("res.isSuccess", res.isSuccess);
        dispatch(acquireAllListings(res.data.allListings));
      }
      if (res.isError) {
        throw new Error("抓取資料錯誤");
      }
    } catch (error) {
      console.log("error", error);
      throw new Error(error?.message);
    }
  };

  // listing deletion mutation
  const deleteListingMutation = useMutation({
    mutationFn: async ({ imageUrls, _id }) => {
      const res = await axios.post(`/api/listing/delete/${_id}`, {
        imageUrls,
      });
      return res.data || null;
    },
    onSuccess: () => {
      toast.success("刪除成功");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  return {
    deleteListingMutation,
    getCertainUserAllListingsQuery,
    getVerifiedPerListQuery,
    getUnverifiedPerListQuery,
    getAllListingsQuery,
    refetchAllListingsQuery,
  };
};
