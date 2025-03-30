import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSelector } from "react-redux";
import UpdateListingForm from "./UpdateListingForm";
import UpdateListingPics from "./UpdateListingPics";
import { useMutation } from "@tanstack/react-query";
import { updateListingForm } from "@/service/service";
import { useNavigate, useParams } from "react-router-dom";
import { useListingActions } from "../../hooks/useListingActions";
import toast from "react-hot-toast";

// Zod Schema驗證表單
const formSchema = z
  .object({
    name: z.string().min(2, "標題至少輸入2字"),
    description: z.string().min(2, "描述至少輸入2字"),
    address: z.string().min(8, "地址至少輸入8字"),
    regularPrice: z.coerce.number().min(3, "原價至少為3"),
    discountPrice: z.coerce.number().optional(), // 預設允許為 undefined
    bathrooms: z.coerce.number().min(1, "浴室數量必須非負數"),
    bedrooms: z.coerce.number().min(1, "房間數量必須非負數"),
    options: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (data.options.includes("offer")) {
      // 檢查offer有無被勾
      if (data.discountPrice === undefined || data.discountPrice < 1) {
        ctx.addIssue({
          path: ["discountPrice"],
          message: "優惠價至少為1",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

const UpdatelistingComponent = () => {
  const [imageItems, setImageItems] = useState([]);
  const [checkboxOptions, setCheckboxOptios] = useState([
    "furnished",
    "parking",
    "rent",
    "sell",
    "offer",
  ]);
  const navigate = useNavigate();
  const [oldImageUrls, setOldImageUrls] = useState([]);
  const params = useParams();
  const listingId = params.listingId;
  const { currentUser } = useSelector((state) => state.userReducer);
  const { getVerifiedPerListQuery, refetchAllListingsQuery } =
    useListingActions(listingId);
  const { data } = getVerifiedPerListQuery;

  // 舊圖片的狀態
  const [displayedOldPics, setDisplayedOldPics] = useState([]);

  useEffect(() => {
    refetchAllListingsQuery();
  }, []);

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
    if (data) {
      const {
        name,
        description,
        address,
        type,
        regularPrice,
        discountPrice,
        options,
        bathrooms,
        bedrooms,
        userRef,
        _id,
        createdAt,
        furnished,
        imageUrls,
        offer,
        parking,
        updatedAt,
      } = data;

      const oldSelectedCheckbox = [
        furnished && "furnished",
        parking && "parking",
        offer && "offer",
        type === "rent" ? "rent" : "sell",
      ].filter(Boolean);

      form.reset({
        name: name,
        description: description,
        address: address,
        type: type,
        regularPrice: regularPrice,
        discountPrice: discountPrice,
        options: oldSelectedCheckbox,
        bathrooms: bathrooms,
        bedrooms: bedrooms,
      });
      if (imageUrls?.length) {
        setOldImageUrls(imageUrls);
      }
    }
  }, [data]);

  const submitFormMutation = useMutation({
    mutationFn: (formValue) => {
      return updateListingForm(
        formValue,
        displayedOldPics,
        imageItems,
        currentUser._id,
        listingId,
        checkboxOptions
      );
    },
    onSuccess: (data) => {
      if (!data) return;
      toast.success("提交成功");
      navigate(`/listing/${data._id}`);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.message || "發生錯誤"
      );
    },
  });

  // 提交form
  function onSubmit(formValue) {
    submitFormMutation.mutate(
      formValue,
      displayedOldPics,
      imageItems,
      listingId
    );
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto mb-48 mt-12 p-6 bg-white rounded-lg text-gray-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-7 flex-wrap xl:flex-nowrap">
            <UpdateListingForm form={form} checkboxOptions={checkboxOptions} />
            <UpdateListingPics
              form={form}
              imageItems={imageItems}
              setImageItems={setImageItems}
              oldImageUrls={oldImageUrls}
              displayedOldPics={displayedOldPics}
              setDisplayedOldPics={setDisplayedOldPics}
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
        </form>
      </Form>
    </div>
  );
};

export default UpdatelistingComponent;
