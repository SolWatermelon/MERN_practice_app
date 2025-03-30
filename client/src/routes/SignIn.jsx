import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../slices/userSlice.js";
import { ErrorMessage } from "@hookform/error-message";
import toast from "react-hot-toast";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { signIn } from "../service/service";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
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
      toast.success("登入成功");
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
    reset();
  };

  return (
    <div className="sign-page themed-background">
      <div className="flex items-center justify-center w-full mt-[100px]">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign In</h1>

          {mutation.isError && (
            <p className="text-red-500 text-sm">
              {"信箱或密碼錯誤，請重新輸入"}
            </p>
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
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
                {...register("email", {
                  required: "信箱為必填",
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
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
                {...register("password", {
                  required: "密碼為必填",
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
              className="w-full font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
            >
              {mutation.isPending ? "登入中..." : "Sign in"}
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
