import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import OAuth from "../components/OAuth";
import { useUserActions } from "@/hooks/useUserActions";

const SignUp = () => {
  const { signupUserMutation } = useUserActions();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    signupUserMutation.mutate({ ...data });
    reset();
  };

  return (
    <div className="sign-page themed-background">
      <div className="flex items-center justify-center w-full mt-[100px]">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign Up</h1>

          {signupUserMutation.isError && (
            <p className="text-red-500 text-sm">{"信箱已被使用，請重新註冊"}</p>
          )}

          {signupUserMutation.isSuccess && (
            <p className="text-blue-500 text-sm">
              {"成功註冊！即將跳轉到登入頁..."}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                id="name"
                type="text"
                placeholder="name"
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
                {...register("name", { required: "name is required." })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                as="p"
                className="text-red-500 text-sm"
              />
            </div>

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
              disabled={signupUserMutation.isPending}
              type="submit"
              className="w-full font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
            >
              {signupUserMutation.isPending ? "還在pend可以放icon" : "Sign up"}
            </button>
          </form>
          <div className="text-center my-4 text-gray-500">or</div>
          <OAuth signupUserMutation={signupUserMutation} />
          <div className="text-center mt-6 text-gray-500 text-sm">
            {signupUserMutation.isPending ? (
              <span className="text-gray-700 ml-1">
                <span className="text-blue-700">
                  You already have an account? sign in
                </span>
              </span>
            ) : (
              <Link to={"/sign-in"} className="text-gray-700 ml-1">
                <span className="text-blue-700">
                  You already have an account? sign in
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
