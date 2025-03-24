import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useSelector, useDispatch } from "react-redux";
// import ListingForm from "./ListingForm";
// import ListingPics from "./ListingPics";
import UpdateListingForm from "./UpdateListingForm";
import UpdateListingPics from "./UpdateListingPics";
// import UpdateListingPics from "./"
import { useMutation } from "@tanstack/react-query";
import { updateListingForm } from "@/service/service";
// import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useListingActions } from "../../hooks/useListingActions";
// import { useParams } from "react-router-dom";

// Zod Schema驗證表單
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "description must be at least 2 characters."),
  address: z.string().min(8, "address must be at least 8 characters."),
  regularPrice: z.coerce.number().min(3, "Must be at least 3"),
  discountPrice: z.coerce.number().min(0, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "bathrooms must be a positive number"),
  bedrooms: z.coerce.number().min(1, "bedrooms must be a positive number"),
  options: z.array(z.string()),
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
  // const {     verifiedPerListingData, verifiedPerListingPending, verifiedPerListingError, getVerifiedPerListQuery } =
  //   useListingActions(listingId);
  const { getVerifiedPerListQuery } = useListingActions(listingId);
  const { data, isLoading, error, refetch } = getVerifiedPerListQuery;

  // 舊圖片的狀態
  const [displayedOldPics, setDisplayedOldPics] = useState([]);
  
  useEffect(() => {
    console.log("listingId", listingId);
    console.log("耶耶getVerifiedPerListQuery.data", data);
  }, [data]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "defaultdefault",
      description: "defaultdefault",
      address: "defaultdefault",
      type: "default",
      regularPrice: 3,
      discountPrice: 0,
      options: [],
      bathrooms: 1,
      bedrooms: 1,
      // removedOldPicsIds:[]
    },
    mode: "onChange", // 讓錯誤即時顯示
    reValidateMode: "onChange",
  });

  useEffect(() => {
    console.log("data!", data);
    if (data) {
      console.log("嗨嗨嗨嗨~~~");
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
        // removedOldPicsIds
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

  // 提交form mutation
  const submitFormMutation = useMutation({
    mutationFn: (formValue) => {
      console.log("formValue~", formValue);
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
      console.log("data", data);
      if (!data) return;
      navigate(`/listing/${data._id}`);
    },
    onError: (error) => {
      // console.log(error);
      throw new Error(error);
    },
  });

  // 提交form
  function onSubmit(formValue) {
    // console.log("form.getValues", form.getValues("removedOldPicsIds"))
    console.log("data", data);
    console.log("displayedOldPics", displayedOldPics);
    console.log("imageItems", imageItems);
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
          {submitFormMutation.isSuccess && (
            <p className="text-blue-500 text-center text-xs mt-3">更新成功！</p>
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

export default UpdatelistingComponent;
