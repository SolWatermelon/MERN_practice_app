import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {updateUserSuccess} from "../../slices/userSlice"
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import Pic from "./Pic";

const ListingPics = ({ form }) => {
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { currentUser } = useSelector((state) => state.userReducer);
  const base64ImagesURLsRef = useRef(null);

  // listing pics upload mutation
  const uploadPics = useMutation({
    mutationFn: (e) => handlePics(e),
    onSuccess: (data) => {
      if (!data) return;
      console.log("~data", data);

      //   dispatch(
      //     updateUserSuccess({
      //       ...currentUser,
      //       avatar: data?.secure_url,
      //       updatedAt: data?._doc?.updatedAt,
      //     })
      //   );
    },
  });

  const uploadPicsToDB = useMutation({
    mutationFn: () => handleUploadPicsToDB(),
    onSuccess: (data) => {
      console.log("data~`", data);
      if (!data) return;

      dispatch(
        updateUserSuccess({
          ...currentUser,
          listingPicsPublicID: data?.listingPicsPublicID,
          listingPicsSecureURL: data?.listingPicsSecureURL,
        })
      );
    },
  });

  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    // 更新
    if (updatedFiles.length > 0) {
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      form.setValue("file", dataTransfer.files);
    } else {
      form.setValue("file", null);
    }
  };

  // Helper function to convert file to base64
  const setFileToBase = (vals) => {
    return vals.map((val) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onloadend = () => {
            console.log('file:', reader.result);
            resolve(reader.result)
        }
        reader.onerror = (err) => reject(err);
      });
    });
  };

//   Promise.all(setFileToBase(vals))

  const handlePics = async (e) => {
    try {
      const vals = e.target.files;
      console.log("res!!!!");
      if (!vals.length) return;
      const uploadData = [...files, ...vals];
      setFiles(uploadData);
      // 轉換為FileList格式
      const dataTransfer = new DataTransfer();
      uploadData.forEach((data) => dataTransfer.items.add(data));
      form.setValue("file", dataTransfer.files);
      const base64Images = await Promise.allSettled(setFileToBase(uploadData));
      const base64ImagesURLs = base64Images.map((base64Image) => {
        return base64Image.value;
      });
      base64ImagesURLsRef.current = base64ImagesURLs;
      return base64Images;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleUploadPicsToDB = async () => {
    try {
      const base64Images = base64ImagesURLsRef.current;
      console.log("base64Images`~~~", base64Images);
      const res = await axios.post("/api/listing/create/pics", {
        ...currentUser,
        base64Images,
      });
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
<div className="flex items-center gap-2">
<div className="text-gray-700 text-sm">Upload File</div>
          {uploadPicsToDB.isPending && <p className="text-xs">處理中...</p>}
          {uploadPicsToDB.isSuccess && (
            <p className="text-blue-500 text-xs">上傳成功！</p>
          )}
          {uploadPicsToDB.isError && (
            <p className="text-red-500 text-xs">上傳失敗</p>
          )}
</div>
        <div className="flex justify-start items-center flex-wrap gap-2">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-gray-700">Upload File</FormLabel> */}
                <FormControl className="flex justify-center items-center">
                  <input
                    className="w-[180px] border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="file"
                    onChange={(e) => uploadPics.mutate(e)}
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
            onClick={() => {
              uploadPicsToDB.mutate();
            }}
            type="button"
            size="sm"
          >
            上傳
          </Button>


        </div>

        <div className="mt-6">
          {files.map((file, index) => (
            <div key={index}>
              <div className="text-xs text-blue-500 min-w-[100px] mt-1">
                {file.name}

                <button
                  type="button"
                  className="ml-2 text-xs text-red-400"
                  onClick={() => removeFile(index)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pic />
      </div>
    </div>
  );
};

export default ListingPics;
