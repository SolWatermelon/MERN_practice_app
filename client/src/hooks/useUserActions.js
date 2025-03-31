import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  updateUserSuccess,
  deleteUserSuccess,
  signOutUserSuccess,
} from "../slices/userSlice";
import { signUp } from "@/service/service";
import toast from "react-hot-toast";

export const useUserActions = (userRef) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      // try {
      const file = e.target.files?.[0];
      if (!file) return null;

      const base64Image = await setFileToBase(file);
      const res = await axios.post("/api/avatar/upload", {
        ...currentUser,
        base64Image,
      });
      return res.data || null;
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
      toast.success("上傳成功");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤，請重新操作"
      );
    },
  });

  // user info update mutation
  const updateUserInfo = useMutation({
    mutationFn: async (data) => {
      const { name, email, password } = data;
      const updatedData = password
        ? { name, email, password }
        : { name, email };

      const res = await axios.post(
        `/api/user/update/${currentUser?._id}`,
        updatedData
      );
      return res.data || null;
    },
    onSuccess: (data) => {
      toast.success("儲存成功");
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
      toast.error("發生錯誤，儲存失敗");
    },
  });

  // user deletion mutation
  const deleteUser = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(`/api/user/delete/${currentUser?._id}`);
      return res.data || null;
    },
    onSuccess: (data) => {
      dispatch(deleteUserSuccess(data));
      toast.success("刪除成功");
    },
    onError: (error) => {
      toast.error(
        error?.message || error?.response?.data?.message || "發生錯誤"
      );
    },
  });

  // user signup mutation
  const signupUserMutation = useMutation({
    mutationFn: (userSigninData) => signUp(userSigninData),
    onSuccess: () => {
      toast.success("註冊成功");
      // setTimeout(() => {
        navigate("/sign-in", { replace: true });
      // }, 1000);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  // user signout mutation
  const signoutUser = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(`/api/auth/signout`);
        return res.data || null;
      } catch (error) {
        throw new Error(error?.message);
      }
    },
    onSuccess: (data) => {
      toast.success("登出成功");
      dispatch(signOutUserSuccess(data));
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  // get landlord info Query
  const getLandlordInfoQuery = useQuery({
    queryKey: ["landlordInfo", userRef],
    queryFn: async ({ queryKey }) => {
      const [, userRefId] = queryKey;
      if (!userRefId) return;
      const res = await axios.get(`/api/user/${userRefId}`);
      return res.data || null;
    },
    enabled: !!userRef, // 變數存在才執行(必須轉成boolean)
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  return {
    currentUser,
    updateAvatar,
    updateUserInfo,
    deleteUser,
    getLandlordInfoQuery,
    signupUserMutation,
    signoutUser,
  };
};
