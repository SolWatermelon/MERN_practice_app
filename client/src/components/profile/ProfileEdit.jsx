import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { MdOutlineEdit } from "react-icons/md";
import {useUserActions} from "../../hooks/useUserActions"

const ProfileEdit = () => {
    const { currentUser, updateAvatar, updateUserInfo } = useUserActions();
  const avatarRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: currentUser?.username || "",
      email: currentUser?.email || "",
      password: "",
    }
  });

  const handleAvatar = () => {
    avatarRef.current.click();
  };

  const onSubmit = (data) => {
    updateUserInfo.mutate(data, {
      onSuccess: () => {
        reset({ password: "" });
      }
    });
  };

  return (
    <div className="flex tablet:flex-row flex-col justify-center items-center tablet:items-start bg-white rounded-lg shadow-md">
      {/* Avatar section */}
      <div className="px-12 pt-12 md:p-12 relative">
        <div className="w-40 h-40 rounded-full overflow-hidden relative bg-gray-300">
          <img
            className="w-full h-full object-cover cursor-pointer"
            src={currentUser?.avatar}
            alt="profile_pic"
          />
          <div
            onClick={handleAvatar}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity rounded-full"
          >
            <MdOutlineEdit className="text-3xl text-white" />
          </div>
        </div>
        
        {updateAvatar.isPending && <div className="text-gray-500 text-sm">上傳中...</div>}
        {/* {updateAvatar.isError && <div className="text-red-500 text-sm">上傳錯誤，請重新上傳</div>}
        {updateAvatar.isSuccess && <div className="text-blue-500 text-sm">上傳成功</div>} */}
      </div>

      <input
        className="hidden"
        onChange={(e) => updateAvatar.mutate(e)}
        ref={avatarRef}
        id="avatar"
        type="file"
        accept="image/*"
      />

      {/* Form section */}
      <div className="flex items-center justify-center mt-[10px] w-full">
        <div className="px-8 pt-3 pb-16 md:p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-700 mb-8">個人資料</h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                id="name"
                type="text"
                placeholder="name"
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
                {...register("name", { required: "name is required." })}
              />
              <ErrorMessage errors={errors} name="name" as="p" className="text-red-500 text-sm" />
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
              <ErrorMessage errors={errors} name="email" as="p" className="text-red-500 text-sm" />
            </div>

            <div className="mb-6">
              <input
                id="password"
                type="password"
                placeholder="password (optional)"
                className="w-full p-3 rounded-full border-2 border-gray-300 text-gray-800 focus:outline-none focus:border-darkorange"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                  validate: value => 
                    value === "" || value.length >= 8 || "Password must be at least 8 characters."
                })}
              />
              <ErrorMessage errors={errors} name="password" as="p" className="text-red-500 text-sm" />
            </div>

            <div className="flex gap-3">
              <button
                disabled={updateUserInfo.isPending}
                type="submit"
                className="w-full font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
              >
                {updateUserInfo.isPending ? "處理中..." : "儲存"}
              </button>

              <button
                type="button"
                onClick={() => reset()}
                disabled={updateUserInfo.isPending}
                className="w-full font-medium py-3 px-4 border-2 border-darkorange text-darkblue hover:bg-hoverlighttext hover:text-white hover:border-hoverlighttext rounded-full transition-colors"
              >
                取消
              </button>
            </div>
            
            {/* {updateUserInfo.isError && <div className="text-red-500 text-sm mt-2">儲存失敗</div>}
            {updateUserInfo.isSuccess && <div className="text-blue-500 text-sm mt-2">儲存成功</div>} */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit