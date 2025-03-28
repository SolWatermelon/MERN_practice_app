import React from "react";
import { googleSignIn } from "../service/service.js";
import { signInSuccess } from "../slices/userSlice.js";

import { useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const OAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: () => googleSignIn(),
    onSuccess: (data) => {
      
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
      toast.success("登入成功");
    },
    onError: (error) => {
      toast.error(
        error?.message || error?.response?.data?.message || "發生錯誤"
      );
    },
  });
  
  
  const handleGoogle = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleGoogle}
      type="button"
      disabled={mutation.isPending}
      className="w-full font-medium py-3 px-4 border-4 border-darkorange hover:border-hoverlighttext text-gray-800 rounded-full transition-colors"
    >
      Sign with Google
    </button>
  );
};

export default OAuth;
