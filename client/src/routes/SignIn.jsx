import React from "react";
import { useTheme } from "@/components/theme-provider";
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
  const { theme } = useTheme();
  // const lightModeBG = `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1091%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(255%2c 180%2c 81%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c263 C 96%2c221 288%2c49.6 480%2c53 C 672%2c56.4 768%2c270.2 960%2c280 C 1152%2c289.8 1344%2c137.6 1440%2c102L1440 560L0 560z' fill='rgba(255%2c 212%2c 154%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c284 C 57.6%2c313.2 172.8%2c423.2 288%2c430 C 403.2%2c436.8 460.8%2c312.2 576%2c318 C 691.2%2c323.8 748.8%2c447.2 864%2c459 C 979.2%2c470.8 1036.8%2c375 1152%2c377 C 1267.2%2c379 1382.4%2c450.6 1440%2c469L1440 560L0 560z' fill='rgba(255%2c 235%2c 206%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1091'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`;
  // const darkModeBG =`data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1002%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%230e2a47'%3e%3c/rect%3e%3cpath d='M 0%2c229 C 57.6%2c188.2 172.8%2c24.6 288%2c25 C 403.2%2c25.4 460.8%2c215.2 576%2c231 C 691.2%2c246.8 748.8%2c119.6 864%2c104 C 979.2%2c88.4 1036.8%2c158.6 1152%2c153 C 1267.2%2c147.4 1382.4%2c91.4 1440%2c76L1440 560L0 560z' fill='rgba(18%2c 57%2c 99%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c424 C 96%2c418.6 288%2c391.6 480%2c397 C 672%2c402.4 768%2c473.4 960%2c451 C 1152%2c428.6 1344%2c318.2 1440%2c285L1440 560L0 560z' fill='rgba(27%2c 81%2c 140%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1002'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e`
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
        navigate("/", { replace: true });
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
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
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
              className="w-full font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
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
