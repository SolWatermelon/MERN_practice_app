import React, { useState, useEffect } from "react";
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
import { useListingActions } from "@/hooks/useListingActions.js"
import toast from "react-hot-toast";


// Zod Schema驗證表單
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "description must be at least 2 characters."),
  address: z.string().min(8, "address must be at least 8 characters."),
  regularPrice: z.coerce.number().min(3, "Must be at least 3"),
  discountPrice: z.coerce.number().min(1, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "bathrooms must be a positive number"),
  bedrooms: z.coerce.number().min(1, "bedrooms must be a positive number"),
  options: z.array(z.string())
  });

const CreateListingComponent = () => {
  const dispatch = useDispatch();
  const {  refetchAllListingsQuery } = useListingActions();
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
      name: "",
      description: "",
      address: "",
      type: "",
      regularPrice: 0,
      discountPrice: 0,
      options: [],
      bathrooms: 0,
      bedrooms: 0,
    },
    mode: "onChange", // 讓錯誤即時顯示
    reValidateMode: "onChange",
  });

  useEffect(() => {
    refetchAllListingsQuery()
  }, [])

  // 提交form mutation
  const submitFormMutation = useMutation({
    mutationFn: (formValue) => {
      return createListingForm(formValue, imageItems, currentUser._id, checkboxOptions);
    },
    onSuccess: (data) => {
      if (!data) return;
      toast.success("提交成功");
      navigate(`/listing/${data._id}`)
    },
    onError: (error) => {
      toast.error(error?.message || error?.response?.data?.message || "發生錯誤");
    },
  });

  // 提交form
  function onSubmit(formValue) {
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
          {/* {submitFormMutation.isSuccess && (
            <p className="text-blue-500 text-center text-xs mt-3">提交成功！</p>
          )}
          {submitFormMutation.isError && (
            <p className="text-red-500 text-center text-xs  mt-3">
              {submitFormMutation?.error?.response?.data?.message ||
                submitFormMutation?.error?.message}
            </p>
          )} */}
        </form>
      </Form>
    </div>
  );
};

export default CreateListingComponent;
