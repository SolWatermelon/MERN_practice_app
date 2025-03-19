import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ListingForm from "./ListingForm";
import ListingPics from "./ListingPics";
import { useMutation } from "@tanstack/react-query";
import { createListingForm } from "@/service/service";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Zod Schema驗證表單
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "description must be at least 2 characters."),
  address: z.string().min(8, "address must be at least 8 characters."),
  regularPrice: z.coerce.number().min(3, "Must be at least 3"),
  discountPrice: z.coerce.number().min(0, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "bathrooms must be a positive number"),
  bedrooms: z.coerce.number().min(1, "bedrooms must be a positive number"),
  options: z.array(z.string())
  // .min(1, "At least one option must be selected."),
  // file: z.any().refine((files) => files?.length > 0, "At least one file is required")
  // 支持多檔案上傳
  // file: z
  //   .instanceof(FileList)
  //   .refine((files) => files?.length > 0  && files?.length <= 6, "At least one file is required"),
  // ===================
  // 3/19注意
  // file: z
  //   .any()
  //   .refine(
  //     (files) =>
  //       files instanceof FileList && files?.length > 0 && files?.length <= 6,
  //     { message: "You must upload at least 1 and at most 6 files." }
  //   ),
  // imageUrls: z.array(z.string())
});

const CreateListingComponent = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const [imageItems, setImageItems] = useState([]);
  const [checkboxOptions, setCheckboxOptios] = useState([
    "furnished",
    "parking",
    "rent",
    "sell",
    "offer",
  ]);
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "聒聒",
      description: "12345667mjkl",
      address: "hjkldnkljiko",
      type: "rent",
      regularPrice: 3,
      discountPrice: 0,
      options: [],
      bathrooms: 3,
      bedrooms: 3,
      // offer: false,
      // parking: false,
      // furnished: false
      // file: null,
    },
    mode: "onChange", // 讓錯誤即時顯示
    reValidateMode: "onChange",
  });

  // 提交form mutation
  const submitFormMutation = useMutation({
    mutationFn: (formValue) => {
      return createListingForm(formValue, imageItems, currentUser._id, checkboxOptions);
    },
    onSuccess: (data) => {
      console.log("data", data);
      if (!data) return;
      navigate(`/listing/${data._id}`)
    },
    onError: (error) => {
      // console.log(error);
      throw new Error(error);
    },
  });

  // 提交form
  function onSubmit(formValue) {
    console.log("這裡")
    submitFormMutation.mutate(formValue);
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto mb-48 mt-12 p-6 bg-white rounded-lg text-gray-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-7 flex-wrap xl:flex-nowrap">
            <ListingForm form={form} checkboxOptions={checkboxOptions}/>
            <ListingPics
              form={form}
              imageItems={imageItems}
              setImageItems={setImageItems}
            />
          </div>
          <div className="w-full h-full flex xl:justify-center justify-center mt-36">
            <Button
            type="submit"
              disabled={submitFormMutation.isPending}
              className="w-[200px] font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
            >
              {submitFormMutation.isPending ? (
                <p className="text-xs">處理中...</p>
              ) : (
                "submit"
              )}
            </Button>
          </div>
          {submitFormMutation.isSuccess && (
            <p className="text-blue-500 text-center text-xs mt-3">提交成功！</p>
          )}
          {submitFormMutation.isError && (
            <p className="text-red-500 text-center text-xs  mt-3">
              {submitFormMutation?.error?.response?.data?.message ||
                submitFormMutation?.error?.message}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateListingComponent;
