import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ListingForm from "./ListingForm";
import ListingPics from "./ListingPics";

// Zod Schema驗證表單
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(2, "description must be at least 2 characters."),
  address: z.string().min(8, "address must be at least 8 characters."),
  regularPrice: z.coerce.number().min(3, "Must be at least 3"),
  discountPrice: z.coerce.number().min(1, "Must be at least 1"),
  bathrooms: z.coerce.number().min(1, "bathrooms must be a positive number"),
  bedrooms: z.coerce.number().min(1, "bedrooms must be a positive number"),
  options: z.array(z.string()).min(1, "At least one option must be selected."),
  // file: z.any().refine((files) => files?.length > 0, "At least one file is required")
  // 支持多檔案上傳
  // file: z
  //   .instanceof(FileList)
  //   .refine((files) => files?.length > 0  && files?.length <= 6, "At least one file is required"),
  file: z
    .any()
    .refine(
      (files) =>
        files instanceof FileList && files?.length > 0 && files?.length <= 6,
      { message: "You must upload at least 1 and at most 6 files." }
    ),
});

const CreateListingComponent = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      regularPrice: 3,
      discountPrice: 1,
      options: [],
      bathrooms: 1,
      bedrooms: 1,
      file: null,
    },
    mode: "onChange", // 讓錯誤即時顯示
    reValidateMode: "onChange",
  });

  // 提交表單
  function onSubmit(values) {
    // console.log("Form submitted:", values);
    // 轉換FileList
    // const files = values.file ? Array.from(values.file) : [];

    // console.log("Form submitted:", {
    //   ...values,
    //   file: files
    // });
    console.log("Form submitted:", values);
  }

  return (
    <div className="w-full max-w-[1100px] mx-auto mb-48 mt-12 p-6 bg-white rounded-lg text-gray-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-7 flex-wrap xl:flex-nowrap">
            <ListingForm form={form} />
            <ListingPics form={form} />
          </div>
          <div className="w-full h-full flex xl:justify-center justify-center mt-36">
            <Button className="w-[200px] font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateListingComponent;
