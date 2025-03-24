import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const useListingActions = (listingId) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  // const [userListings, setUserListings] = useState([]);

  //  get per listing(verified)
  // const {
  //   data: verifiedPerListingData,
  //   isLoading: verifiedPerListingPending,
  //   error: verifiedPerListingError,
  //   refetch: verifiedPerListingRefetch,
  // }
  const getVerifiedPerListQuery = useQuery({
    queryKey: ["perVerifiedListing", listingId],
    queryFn: async ({ queryKey }) => {
      try {
        const [, id] = queryKey;
        if (!id || !currentUser?._id) return null;

        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        if (!res.data.listings.length) throw new Error("無法抓取資料");

        return res.data.listings.find((listing) => listing._id === id) || null;
      } catch (e) {
        console.log("e", e);
      }
    },
    enabled: !!currentUser?._id && !!listingId, // 變數存在才執行
  });

  //  get per listing mutation(unverified)
  // const getUnverifiedPerListQueryingMutation = useMutation({
  //   mutationFn: async (listingId) => {
  //     try {
  //       console.log("listingId", listingId);
  //       const res = await axios.get(`/api/listing/get/${listingId}`);
  //       console.log("res", res);
  //       console.log("res.data.listing", res.data.listing);
  //       if (!Object.keys(res?.data?.listing).length) {
  //         throw new Error("無法抓取資料");
  //       }
  //       return res.data.listing;
  //     } catch (error) {
  //       throw error.message;
  //     }
  //   },
  //   onSuccess: (data) => {
  //     if (!data) return;
  //     // setUnverifiedPerListing(data);
  //   },
  //   onError: (error) => {
  //     console.error("請求錯誤", error);
  //   },
  // });

  //  get per listing(unverified)
  // const {
  //   data: unverifiedPerListingData,
  //   isLoading: unverifiedPerListingPending,
  //   error: unverifiedPerListingError,
  //   refetch: unverifiedPerListingRefetch,
  // }

  //  get per listing query(unverified)
  const getUnverifiedPerListQuery = useQuery({
    queryKey: ["perUnverifiedListing", listingId],
    queryFn: async ({ queryKey }) => {
      try {
        console.log("listingId", listingId)
        const [, id] = queryKey;
        if (!id || !currentUser?._id) return null;

        const res = await axios.get(`/api/listing/get/${listingId}`);
        if (!Object.keys(res?.data?.listing).length)
          throw new Error("無法抓取資料");

        return res.data.listing || null;
      } catch (e) {
        console.log(e);
      }
    },
    enabled: !!currentUser?._id && !!listingId, // 變數存在才執行
  });









  //  get all listings mutation
  // const getListingMutation = useMutation({
  //   mutationFn: async () => {
  //     try {
  //       const res = await axios.get(`/api/user/listings/${currentUser._id}`);
  //       return res.data.listings;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  //   onSuccess: (data) => {
  //     console.log("data", data);
  //     setUserListings(data);
  //     if (!data) return;
  //     // setGetUserListings(data)
  //   },
  //   onError: (error) => {
  //     console.error("請求錯誤", error);
  //   },
  // });

  // const {
  //   data: allListingsData,
  //   isPending: allListingsDataPending,
  //   error: allListingsDataError,
  //   isError: isAllListingsDataError,
  //   isSuccess: isAllListingsDataSuccess,
  //   refetch: allListingsDataRefetch,
  // }

  const getAllListingsDataQuery = useQuery({
    queryKey: ["allListings"],
    queryFn: async () => {
      try {
        if (!currentUser?._id) return null;

        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        if (!res.data.listings) throw new Error("無法抓取資料");

        return res.data.listings || null;
      } catch (e) {
        console.log(e);
      }
    },
    enabled: !!currentUser?._id, // 變數存在才執行
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
        return res.data || null;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      if (!data) return;
      console.log("成功");
    },
    onError: (error) => {
      console.error("請求錯誤", error);
    },
  });

  return {
    // getListingMutation,
    // verifiedPerListingData,
    // verifiedPerListingPending,
    // verifiedPerListingError,
    // getPerListingMutation,
    deleteListingMutation,
    // userListings,
    // setUserListings,
    // unverifiedPerListingData,
    // unverifiedPerListingPending,
    // unverifiedPerListingError,
    // allListingsData,
    // allListingsDataPending,
    // allListingsDataError,
    // isAllListingsDataError,
    // isAllListingsDataSuccess,
    getAllListingsDataQuery,
    getVerifiedPerListQuery,
    getUnverifiedPerListQuery,
    // perUserListings,
    // setPerUserListings,
    // getUnverifiedPerListQueryingMutation,
    // unverifiedPerListing,
  };
};
