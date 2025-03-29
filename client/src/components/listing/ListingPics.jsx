import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import Pic from "./Pic";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";

const ListingPics = ({ form, imageItems, setImageItems }) => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const handleFileSelect = async (e) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      // 建新的圖片
      const newItems = [];

      // 轉換為base64-1
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 轉換為base64-2
        const base64 = await convertToBase64(file);

        // 加到arr
        newItems.push({
          id: `file-${Date.now()}-${i}`,
          file,
          base64,
          status: "pending",
        });
      }

      // 更新
      setImageItems([...imageItems, ...newItems]);
      updateFormFileValue();

      if (newItems.length > 5) {
        form.setValue("file", null);
        setImageItems([]);
      }

      return newItems;
    } catch (error) {
      console.error("處理文件失敗:", error);
      throw error;
    }
  };

  // 轉換文件為base64
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
        throw new Error("沒有等待上傳的圖片");
      }

      // 更新狀態為uploading
      setImageItems((prev) =>
        prev.map((item) =>
          item.status === "pending" ? { ...item, status: "uploading" } : item
        )
      );

      // 所有base64
      const base64Images = pendingItems.map((item) => item.base64);
      const res = await axios.post("/api/listing/create/pics", {
        ...currentUser,
        // base64Images,
        pendingItems,
      });

      return {
        data: res.data,
        pendingItems,
      };
    },
    onSuccess: ({ data, pendingItems }) => {
      toast.success("上傳成功");
      if (!data || !data.picsMainInfo) return;

      let updatedItems = [...imageItems];

      data.picsMainInfo.forEach((info, index) => {
        updatedItems.forEach((item) => {
          if (info.listingPicsPublicID.includes(item.id)) {
            item.publicId = info.listingPicsPublicID;
            item.url = info.listingPicsSecureURL;
            item.status = "uploaded";
          }
        });
      });

      setImageItems(updatedItems);
    },
    onError: (error) => {
      toast.error(
        error?.message || error?.response?.data?.message || "發生錯誤"
      );

      // 失敗後將狀態改變
      setImageItems((prev) =>
        prev.map((item) =>
          item.status === "uploading" ? { ...item, status: "error" } : item
        )
      );
    },
  });

  const handleRemove = (item) => {
    setImageItems((prev) => prev.filter((i) => i.id !== item.id));
    updateFormFileValue();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="text-gray-700 text-sm">上傳圖片
          <p className="text-red-400 dark:text-red-500 text-xs">（圖片上限為5張）</p>
          </div>
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
                    onChange={handleFileSelect}
                    className="w-[180px] border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="file"
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
            disabled={
              imageItems.length > 5 ||
              !imageItems.some((item) => item.status === "pending")
            }
          >
            上傳
          </Button>
        </div>

        {/* 顯示已上傳的圖片 */}
        <div className="mt-4 flex flex-wrap gap-4">
          {imageItems.length > 5 ? (
            <p className="text-red-400 dark:text-red-500 text-xs">圖片數量錯誤</p>
          ) : (
            imageItems.map((item) => (
              <div key={item.id} className="relative">
                {item.status === "uploaded" ? (
                  <>
                    <Pic url={item.url} />
                    {/* <button
                      type="button"
                      className="mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    >
                    </button> */}
                    <MdCancel
                      className=" absolute top-4 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    />
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
                    <MdCancel
                      className=" absolute top-0 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-20 bg-red-100 flex items-center justify-center">
                      <span className="text-red-400 dark:text-red-500 text-xs">上傳失敗</span>
                    </div>
                    <MdCancel
                      className=" absolute top-4 right-0 text-[17px] cursor-pointer hover:scale-[1.08] mt-1 text-xs text-red-400"
                      onClick={() => handleRemove(item)}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingPics;
