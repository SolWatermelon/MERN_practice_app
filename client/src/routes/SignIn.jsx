import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// // import {toggleMenu} from "../slices/navToggleSlice.js"
import { signInSuccess } from "../slices/userSlice.js";
import { ErrorMessage } from "@hookform/error-message";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { signIn, getUser } from "../service/service";
import OAuth from "../components/OAuth.jsx";

// =============================== 可以使用react hook form將state存在redux!!!請看form的官網(但我們是要redux toolkit唷) ----------------------
const SignIn = () => {
  // const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userSigninData) => signIn(userSigninData),
    onSuccess: (data) => {
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: (error) => {
      console.error("API error:", error);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate({ ...data });
    reset();
  };

  return (
    <div className="sign-page">
    <div className="flex items-center justify-center w-full mt-[100px]">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign In</h1>

        {mutation.isError && (
          <p className="text-red-500 text-sm">{"信箱或密碼錯誤，請重新輸入"}</p>
        )}

        {mutation.isSuccess && (
          <p className="text-blue-500 text-sm">
            {"成功登入！即將跳轉到首頁..."}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              placeholder="email"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email format is incorrect.",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-6">
            <input
              id="password"
              type="password"
              placeholder="password"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
              {...register("password", {
                required: "password is required",
                minLength: { value: 8, message: "minimun is 8 characters." },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              as="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            disabled={mutation.isPending}
            type="submit"
            className="w-full bg-pink-200 text-gray-700 font-medium py-3 px-4 rounded-full hover:bg-pink-300 transition duration-200"
          >
            {mutation.isPending ? "還在pend可以放icon" : "Sign in"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <OAuth mutation={mutation} />

        <div className="text-center mt-6 text-gray-500 text-sm">
          {mutation.isPending ? (
            <span className="text-gray-700 ml-1">
              <span className="text-blue-700">
                You don't have an account? sign up here
              </span>
            </span>
          ) : (
            <Link to={"/sign-up"} className="text-gray-700 ml-1">
              <span className="text-blue-700">
                You don't have an account? sign up here
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignIn;
