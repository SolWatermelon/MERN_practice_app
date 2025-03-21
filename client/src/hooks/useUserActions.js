import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  updateUserSuccess,
  deleteUserSuccess,
  signOutUserSuccess,
} from "../slices/userSlice";

export const useUserActions = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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
        return res.data;
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
    }
  });

  // user info update mutation
  const updateUserInfo = useMutation({
    mutationFn: async (data) => {
      try {
        const { name, email, password } = data;
        const updatedData = password ? { name, email, password } : { name, email };
        
        const res = await axios.post(
          `/api/user/update/${currentUser?._id}`,
          updatedData
        );
        return res.data;
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
    }
  });

  // user deletion mutation
  const deleteUser = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.delete(`/api/user/delete/${currentUser?._id}`);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      dispatch(deleteUserSuccess(data));
    }
  });

  // user signout mutation
  const signoutUser = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.get(`/api/auth/signout`);
        return res.data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      dispatch(signOutUserSuccess(data));
    }
  });

  return {
    currentUser,
    updateAvatar,
    updateUserInfo,
    deleteUser,
    signoutUser
  };
};