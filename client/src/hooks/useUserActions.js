import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  updateUserSuccess,
  deleteUserSuccess,
  signOutUserSuccess,
} from "../slices/userSlice";

export const useUserActions = (userRef) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [landlordInfo, setLandlordInfo] = useState(null)

  // convert file to base64
  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  // avatar upload mutation
  const updateAvatar = useMutation({
    mutationFn: async (e) => {
      try {
        const file = e.target.files?.[0];
        if (!file) return null;

        const base64Image = await setFileToBase(file);
        const res = await axios.post("/api/avatar/upload", {
          ...currentUser,
          base64Image,
        });
        return res.data || null
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      if (!data) return;

      dispatch(
        updateUserSuccess({
          ...currentUser,
          avatar: data?.secure_url,
          updatedAt: data?._doc?.updatedAt,
        })
      );
    },
    onError: (error) => {
      console.error("請求錯誤", error);
    },
  });

  // user info update mutation
  const updateUserInfo = useMutation({
    mutationFn: async (data) => {
      try {
        const { name, email, password } = data;
        const updatedData = password
          ? { name, email, password }
          : { name, email };

        const res = await axios.post(
          `/api/user/update/${currentUser?._id}`,
          updatedData
        );
        return res.data || null
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      dispatch(
        updateUserSuccess({
          ...currentUser,
          username: data?.username,
          email: data?.email,
          updatedAt: data?.updatedAt,
        })
      );
    },
    onError: (error) => {
      console.error("請求錯誤", error);
    },
  });

  // user deletion mutation
  const deleteUser = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(`/api/user/delete/${currentUser?._id}`);
        return res.data || null
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      dispatch(deleteUserSuccess(data));
    },
    onError: (error) => {
      console.error("請求錯誤", error);
    },
  });

  // user signout mutation
  const signoutUser = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(`/api/auth/signout`);
        return res.data || null
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      dispatch(signOutUserSuccess(data));
    },
    onError: (error) => {
      console.error("請求錯誤", error);
    },
  });

  // const {
  //   data: signoutData,
  //   isPending: signoutPending,
  //   isError: isSignoutError,
  //   error: signoutErrorMsg,
  //   isSuccess: isSignoutSuccess,
  //   refetch: signoutRefetch,
  // } = useQuery({
  //   queryKey: ["signout"],
  //   queryFn: async () => {
  //     try {
  //       // const [, isFetchabled] = queryKey
  //       // if (!isFetchabled) return null;

  //       const res = await axios.get(`/api/auth/signout`);
  //       console.log("resresres~!!!", res)
  //       if (!res.data) throw new Error("錯誤發生");
  //       return res.data;
  //     } catch (e) {
  //       throw e;
  //     }
  //   },
  //   enabled: false,
  //   onSuccess: (data) => {
  //     console.log("成功登出~~~~~", data);
  //     dispatch(signOutUserSuccess(data));
  //     navigate("/sign-in", { replace: true });
  //   },
  // });

  // get landlord info Query 
    const getLandlordInfoQuery = useQuery({
    queryKey: ["landlordInfo", userRef],
    queryFn: async ({ queryKey }) => {
      try {
        console.log("userRef", userRef)
        const [, userRefId] = queryKey;
        if (!userRefId) return;

        const res = await axios.get(`/api/user/${userRefId}`);
        if (!res.data) throw new Error("無法抓取資料");

        return res.data || null;
      } catch (error) {
        throw new Error(error.message)
      }
    },
    enabled: !!userRef, // 變數存在才執行(必須轉成布玲)
  });




  return {
    currentUser,
    updateAvatar,
    updateUserInfo,
    deleteUser,
    getLandlordInfoQuery,
    // signoutUser,
    // signoutData,
    // signoutRefetch,
    // signoutPending,
    // isSignoutError,
    // signoutErrorMsg,
    // isSignoutSuccess,
    signoutUser,
    // getLandlordUserInfoMutation,
    // landlordInfo
  };
};
