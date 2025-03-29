import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import Pic from "../listing/Pic";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";

const UpdateListingPics = ({
  form,
  imageItems,
  setImageItems,
  oldImageUrls,
  displayedOldPics,
  setDisplayedOldPics,
}) => {
  const { currentUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (oldImageUrls.length > 0) {
      setDisplayedOldPics(oldImageUrls);
    }
  }, [oldImageUrls]);

  const handleFileSelect = async (e) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newItems = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const base64 = await convertToBase64(file);

        newItems.push({
          id: `file-${Date.now()}-${i}`,
          file,
          base64,
          status: "pending",
        });
      }

      setImageItems([...imageItems, ...newItems]);
      updateFormFileValue();
      if (newItems.length + displayedOldPics.length > 5) {
        form.setValue("file", null);
        setImageItems([]);
      }

      return newItems;
    } catch (error) {
      console.error("處理文件失敗:", error);
      toast.error(
        error?.message || error?.response?.data?.message || "發生錯誤"
      );
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        return reject(new Error("非有效的File物件"));
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  // 更新form裡面的file值
  const updateFormFileValue = () => {
    const pendingFiles = imageItems
      .filter((item) => item.status === "pending")
      .map((item) => item.file);

    if (pendingFiles.length > 0) {
      // Web API中用於保存拖放操作或剪貼板操作期間的數據
      // 將js file轉換為form可以使用的FileList格式
      const dataTransfer = new DataTransfer();
      pendingFiles.forEach((file) => dataTransfer.items.add(file));
      form.setValue("file", dataTransfer.files);
    } else {
      form.setValue("file", null);
    }
  };

  // 上傳文件mutation
  const uploadMutation = useMutation({
    mutationFn: async () => {
      const pendingItems = imageItems.filter(
        (item) => item.status === "pending"
      );

      if (pendingItems.length === 0) {
        toast.error(
          error?.message ||
            error?.response?.data?.message ||
            "沒有等待上傳的圖片"
        );
      }

      // 更新狀態為uploading
      setImageItems((prev) =>
        prev.map((item) =>
          item.status === "pending" ? { ...item, status: "uploading" } : item
        )
      );

      const res = await axios.post("/api/listing/create/pics", {
        ...currentUser,
        pendingItems,
      });

      return {
        data: res.data,
        pendingItems,
      };
    },
    onSuccess: ({ data, pendingItems }) => {
      if (!data || !data.picsMainInfo) return;

      let updatedItems = [...imageItems];

      data.picsMainInfo.forEach((info) => {
        updatedItems.forEach((item) => {
          if (info.listingPicsPublicID.includes(item.id)) {
            item.publicId = info.listingPicsPublicID;
            item.url = info.listingPicsSecureURL;
            item.status = "uploaded";
          }
        });
      });

      setImageItems(updatedItems);
      toast.success("上傳成功");
    },
    onError: (error) => {
      setImageItems((prev) =>
        prev.map((item) =>
          item.status === "uploading" ? { ...item, status: "error" } : item
        )
      );
      toast.error(
        error?.message || error?.response?.data?.message || "發生錯誤，上傳失敗"
      );
    },
  });

  // 刪掉新上傳的圖片
  const handleRemove = (item) => {
    setImageItems((prev) => prev.filter((i) => i.id !== item.id));
    updateFormFileValue();
  };

  // 刪掉舊圖片
  const handleOldPicRemove = (item) => {
    // 從顯示列表移除
    setDisplayedOldPics((prev) => prev.filter((pic) => pic.url !== item.url));

    // 要刪除的圖片ID或url加入
    // setRemovedOldPicsIds((prev) => [...prev, item.publicID || item.url]);

    // 更新表單值
    updateFormFileValue();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 顯示舊的已上傳圖片 */}
      {displayedOldPics.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-700 text-sm mb-2">已上傳圖片</h3>
          <div className="flex flex-wrap gap-4">
            {displayedOldPics.map((item, index) => (
              <div
                key={item.publicID || item.url || index}
                className="relative"
              >
                <Pic url={item.url} />
                <MdCancel
                  className=" absolute top-4  right-0 text-[21px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                  onClick={() => handleOldPicRemove(item)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2">
          <div className="text-gray-700 text-sm">上傳圖片</div>
          {/* {uploadMutation.isPending && <p className="text-xs">處理中...</p>} */}
        </div>

        <div className="flex justify-start items-center flex-wrap gap-2">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl className="flex justify-center items-center">
                  <input
                    className="w-[180px] border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*"
                    multiple
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              </FormItem>
            )}
          />

          <Button
            variant="signoutmode"
            onClick={() => uploadMutation.mutate()}
            type="button"
            size="sm"
            disabled={!imageItems.some((item) => item.status === "pending")}
          >
            上傳
          </Button>
        </div>

        {/* 顯示新上傳的圖片 */}
        {imageItems.length > 0 &&
        imageItems.length + displayedOldPics.length <= 5 ? (
          <div className="mt-4 flex flex-wrap gap-4">
            {imageItems.map((item) => (
              <div key={item.id} className="relative">
                {item.status === "uploaded" ? (
                  <>
                    <Pic url={item.url} />
                    <MdCancel
                      disabled={
                        !imageItems.some((item) => item.status === "pending")
                      }
                      className=" absolute top-4 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    />
                    {/* </div> */}
                  </>
                ) : item.status === "pending" || item.status === "uploading" ? (
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 bg-gray-200 flex items-center justify-center">
                      {item.status === "uploading" ? (
                        <span className="text-xs">上傳中...</span>
                      ) : (
                        <span className="text-xs">等待上傳</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                      disabled={item.status === "uploading"}
                    >
                      <MdCancel
                        className=" absolute top-0 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                        onClick={() => handleRemove(item)}
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 bg-red-100 flex items-center justify-center">
                      <span className="text-xs text-red-500">上傳失敗</span>
                    </div>
                    <MdCancel
                      className=" absolute top-4 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[12px] text-red-500">請注意!圖片上限為5張</p>
        )}
      </div>
    </div>
  );
};

export default UpdateListingPics;
