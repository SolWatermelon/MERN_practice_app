import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import { handleUploadImg } from "../service/service";
// import { useSelector, useDispatch } from "react-redux";
import { ErrorMessage } from "@hookform/error-message";
import { updateUserSuccess } from "../slices/userSlice";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const [image, setImage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const [formdata, setFormData] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setFileToBase = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUploadImg = async (e) => {
    try {
      const file = e.target.files?.[0];
      // console.log("URL.createObjectURL(file):", URL.createObjectURL(file));
      // setAvatar(file ? URL.createObjectURL(file) : undefined);
      const base64Image = await setFileToBase(file);
      console.log(base64Image);
      console.log("嗨嗨");
      const res = await axios.post("/api/avatar/upload", {
        ...currentUser,
        base64Image,
      });
      console.log("res~~", res);
      // dispatch(
      //   updateUserSuccess({
      //     ...currentUser,
      //     avatar: res?.data?.secure_url,
      //     updatedAt: res?.data?._doc?.updatedAt,
      //   })
      // );
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const mutation = useMutation({
    mutationFn: (event) => handleUploadImg(event),
    onSuccess: (data) => {
      console.log("data!", data);
      dispatch(
        updateUserSuccess({
          ...currentUser,
          avatar: data?.secure_url,
          updatedAt: data?._doc?.updatedAt,
        })
      );
      // setTimeout(() => {
      //   navigate("/", { replace: true });
      // }, 1000);
    },
    onError: (error) => {
      console.error("API error:", error);
    },
  });

  const handleAvatar = () => {
    avatarRef.current.click();
  };

  // const mutation = useMutation({
  //   mutationFn: (userSigninData) => signUp(userSigninData),
  //   onSuccess: () => {
  //     // setTimeout(() => {
  //     //   navigate("/sign-in", { replace: true });
  //     // }, 1000);
  //     console / log("修改成功");
  //   },
  //   onError: (error) => {
  //     console.error("API error:", error);
  //   },
  // });

  const onSubmit = (data) => {
    mutation.mutate({ ...data });
    reset();
  };

  return (
    <div className="flex justify-center mt-12">
      <Tabs defaultValue="edit" className="flex flex-col items-start">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="edit">編輯資料</TabsTrigger>
          <TabsTrigger value="accountandarticle">帳戶與文章</TabsTrigger>
          {/* <TabsTrigger value="article">文章管理</TabsTrigger> */}
        </TabsList>
        <TabsContent className=" mb-24 xl:w-[700px] " value="edit">
          <div className="flex tablet:flex-row flex-col justify-center items-center tablet:items-start box-content bg-white rounded-lg shadow-md">
            {/* 放大頭照 */}

            <div className="px-12 pt-12 md:p-12 relative">
              <div className="w-40 h-40 rounded-full overflow-hidden relative bg-gray-300">
                <MdOutlineEdit className="absolute bottom-1 right-1 text-2xl text-red-600" />
                <img
                  className="w-full h-full object-cover cursor-pointer"
                  src={currentUser.avatar}
                  alt="profile_pic"
                />

                <div
                  onClick={handleAvatar}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-full"
                >
                  <MdOutlineEdit className="text-3xl text-white" />
                </div>
                {/* <div className="absolute inset-0 hover:bg-black hover:bg-opacity-20 transition-all rounded-full"></div> */}
              </div>

              {mutation.isPending && (
                <div className="text-gray-500 text-sm">上傳中...</div>
              )}

              {mutation.isError && (
                <div className="text-red-500 text-sm">上傳錯誤，請重新上傳</div>
              )}

              {mutation.isSuccess && (
                <div className="text-blue-500 text-sm">上傳成功</div>
              )}
            </div>

            <input
              className="hidden"
              onChange={(e) => {
                mutation.mutate(e);
              }}
              ref={avatarRef}
              id="avatar"
              type="file"
              placeholder="avatar"
              accept="image/*"
            />

            {/* <div> */}
            <div className="flex items-center justify-center mt-[10px] w-full">
              <div className="px-8 pt-3 pb-16 md:p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-gray-700 mb-8">
                  個人資料
                </h1>

                {/* {mutation.isError && (
                  <p className="text-red-500 text-sm">
                    {"信箱已被使用，請更改"}
                  </p>
                )}

                {mutation.isSuccess && (
                  <p className="text-blue-500 text-sm">{"成功修改資料！"}</p>
                )} */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <div className="hidden mb-4">
                    <input
                    ref={avatarRef}
                      id="avatar"
                      type="file"
                      placeholder="avatar"
                      {...register("avatar")}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="avatar"
                      as="p"
                    />
                  </div> */}

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

                  <span className="flex gap-3">
                    <button
                      disabled={mutation.isPending}
                      type="submit"
                      className="w-full font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
                    >
                      {mutation.isPending ? "還在pend可以放icon" : "儲存"}
                    </button>

                    <button
                      disabled={mutation.isPending}
                      type="submit"
                      className="w-full font-medium py-3 px-4 border-2 border-darkorange text-darkblue  hover:bg-hoverlighttext hover:text-white hover:border-hoverlighttext rounded-full transition-colors"
                    >
                      取消
                    </button>
                  </span>
                </form>
              </div>
            </div>
            {/* </div> */}
          </div>
        </TabsContent>

        {/* =================================================================================== */}
        {/* =================================================================================== */}

        <TabsContent
          className=" xl-24 mobile:w-[330px] md:w-[500px] xl:w-[700px] "
          value="accountandarticle"
        >
          <div className="flex tablet:flex-row flex-col justify-center items-center tablet:items-start box-content bg-white rounded-lg shadow-md">
            {/* 放大頭照 */}

            {/* <div> */}
            <div className="flex items-center justify-center mt-[10px] w-full">
              {/* <div className="px-8 pt-3 pb-16 md:p-8 w-full max-w-md"> */}
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              {/* <Button variant="outline" size="sm">
                  新增房源
                </Button>

                <Button variant="outline" size="sm">
                  房源列表
                </Button> */}

              {/* <div className="flex items-center justify-center mt-[10px] w-full">
              <div className="px-8 pt-3 pb-16 md:p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-gray-700 mb-8"> */}

              <div className="flex gap-6 flex-col justify-center items-center tablet:items-start px-8 pt-3 pb-16 md:p-8 w-[600px] max-w-md">
                <h1 className="text-gray-600 text-2xl font-extrabold">
                  物件管理
                </h1>
                <button
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-3/4 font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
                >
                  新增房源
                </button>

                <button
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-3/4  font-medium py-3 px-4 border-2 border-darkorange text-darkblue  hover:bg-hoverlighttext hover:text-white hover:border-hoverlighttext rounded-full transition-colors"
                >
                  查看房源
                </button>

                <p className="h-[0.8px] w-full bg-slate-500/30"></p>
                <h1 className="text-gray-600 text-2xl font-extrabold">
                  帳戶管理
                </h1>
                <span className="flex gap-3">
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="signoutmode" size="sm">
                        登出帳戶
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  {/* =================== */}

                  <Dialog>
                    <DialogTrigger>
                      <Button variant="deletemode" size="sm">
                        刪除帳戶
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </span>
              </div>

              {/* </form> */}
              {/* </div> */}
            </div>
            {/* </div> */}
          </div>
        </TabsContent>
        {/* <TabsContent value="article">文章</TabsContent> */}
      </Tabs>
    </div>
  );
};

export default Profile;
