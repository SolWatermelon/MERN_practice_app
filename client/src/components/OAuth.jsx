// import { FirebaseError } from "firebase/app";
import React from "react";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../firebase";
import { googleSignIn } from "../service/service.js";
import { signInSuccess } from "../slices/userSlice.js";

import { Link, useNavigate } from "react-router-dom";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";

const OAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: () => googleSignIn(),
    onSuccess: (data) => {
      console.log("data!!!", data)
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      console.error("API error:", error);
    },
  });
  const navigate = useNavigate();
  
  const handleGoogle = () => {
    // try {
    //   const provider = new GoogleAuthProvider();
    //   const auth = getAuth(app);
    //   const result = await signInWithPopup(auth, provider);
    //   console.log("result:", result);
    //   googleSignIn({
    //     name: result.user.displayName,
    //     email: result.user.email,
    //     photo: result.user.photoURL,
    //   });
    // } catch (e) {
    //   console.log("couldn't sign in with google: ", e);
    // }
    mutation.mutate();
  };
  return (
    <button
      onClick={handleGoogle}
      type="button"
      disabled={mutation.isPending}
      className="w-full bg-pink-200 text-gray-700 font-medium py-3 px-4 rounded-full flex items-center justify-center hover:bg-pink-300 transition duration-200"
    >
      Sign in with Google
    </button>
  );
};

export default OAuth;
