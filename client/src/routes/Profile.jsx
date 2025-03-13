import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { currentUser } = useSelector((state) => state.userReducer);

  // const [formdata, setFormData] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userSigninData) => signUp(userSigninData),
    onSuccess: () => {
      // setTimeout(() => {
      //   navigate("/sign-in", { replace: true });
      // }, 1000);
      console / log("修改成功");
    },
    onError: (error) => {
      console.error("API error:", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
    reset();
  };

  return (
    <Tabs defaultValue="edit" className="flex flex-col items-start">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="edit">編輯資料</TabsTrigger>
        <TabsTrigger value="account">帳戶與文章</TabsTrigger>
        {/* <TabsTrigger value="article">文章管理</TabsTrigger> */}
      </TabsList>
      <TabsContent className="w-full mb-24 " value="edit">
        <div className="flex tablet:flex-row flex-col justify-center items-center tablet:items-start box-content bg-white rounded-lg shadow-md">
          {/* 放大頭照 */}

          <span className="px-12 pt-12 md:p-12">
            <img
              className="w-40 rounded-full object-cover bg-gray-300 flex items-center justify-center relative"
              src={currentUser?.avatar}
              alt="profile_pic"
            />
          </span>

          {/* <div> */}
          <div className="flex items-center justify-center mt-[10px]">
            <div className="px-8 pt-3 pb-16 md:p-8 w-full max-w-md">
              <h1 className="text-4xl font-bold text-gray-700 mb-8">Sign Up</h1>

              {mutation.isError && (
                <p className="text-red-500 text-sm">{"信箱已被使用，請更改"}</p>
              )}

              {mutation.isSuccess && (
                <p className="text-blue-500 text-sm">{"成功修改資料！"}</p>
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                      minLength: {
                        value: 8,
                        message: "minimun is 8 characters.",
                      },
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
                  {mutation.isPending ? "還在pend可以放icon" : "Sign up"}
                </button>
              </form>

              <div className="text-center mt-6 text-gray-500 text-sm">
                {mutation.isPending ? (
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
          {/* </div> */}
        </div>
      </TabsContent>
      <TabsContent value="accountandarticle">帳戶與文章</TabsContent>
      {/* <TabsContent value="article">文章</TabsContent> */}
    </Tabs>
  );
};

export default Profile;
