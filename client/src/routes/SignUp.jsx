import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// =============================== 可以使用react hook form將state存在redux!!!請看form的官網(但我們是要redux toolkit唷) ----------------------
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>




        <div className="mb-4">
            <input
              type="text"
              placeholder="name"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
              {...register("name", { required: true })}
            />
            {errors.name && <p>Name is required</p>}
          </div>



          <div className="mb-4">
            <input
              type="email"
              placeholder="email"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
              {...register("email", { required: true })}
            />
            {errors.email && <p>Email is required</p>}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="password"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
              {...register("password, { required: true})")}
            />
            {errors.password && <p>Password is required</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-200 text-gray-700 font-medium py-3 px-4 rounded-full hover:bg-pink-300 transition duration-200"
          >
            Sign up
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">or</div>

        <button className="w-full bg-pink-200 text-gray-700 font-medium py-3 px-4 rounded-full flex items-center justify-center hover:bg-pink-300 transition duration-200">
          Sign in with Google
        </button>

        <div className="text-center mt-6 text-gray-500 text-sm">
          You already have an account?
          <a href="#" className="text-gray-700 ml-1">
            sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
