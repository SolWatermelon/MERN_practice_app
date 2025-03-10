import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
// =============================== 可以使用react hook form將state存在redux!!!請看form的官網(但我們是要redux toolkit唷) ----------------------
const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [formdata, setFormData] = useState(null);
  const onSubmit = (data) => {

    setFormData(data);
    console.log(data);
    reset();
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        {/* <h1 className="text-4xl font-bold text-gray-700 mb-8">{formdata?.name&&<p>{formdata.name}{formdata.email}{formdata.password}</p>}</h1> */}
        <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              id="name"
              type="text"
              placeholder="name"
              className="w-full p-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
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
          <Link to={"/sign-in"} className="text-gray-700 ml-1">
            <span className="text-blue-700 decoration-blue-700">sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
