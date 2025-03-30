import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const UpdateListingForm = ({ form, checkboxOptions }) => {
  const [isDiscountPrice, setIsDiscountPrice] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">標題</FormLabel>
              <FormControl>
                <Input
                  className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                  placeholder="Enter your name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">住址</FormLabel>
              <FormControl>
                <Input
                  className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                  placeholder="Enter your address"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-gray-700">描述</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full p-3 border-2 border-gray-400 text-gray-800  focus:outline-none focus:border-darkorange"
                  placeholder="Write your description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>選項</FormLabel>
          <div className="space-y-2">
            {checkboxOptions.map((option) => (
              <FormField
                key={option}
                control={form.control}
                name="options"
                render={({ field }) => (
                  <FormItem
                    key={option}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      className=" text-gray-800 border-2 border-gray-300"
                      checked={field.value.includes(option)}
                      onCheckedChange={(checked) => {
                        const newOptions = checked
                          ? [...field.value, option] // 加入選項
                          : field.value.filter((val) => val !== option); // 移除選項

                        form.setValue("options", newOptions, {
                          shouldValidate: true,
                        });

                        // offer控制isDiscountPrice
                        if (option === "offer") {
                          setIsDiscountPrice(checked);
                        }
                      }}
                    />
                    <FormLabel className="text-gray-700">{option}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <p
            hidden={!isDiscountPrice}
            className="text-red-400 dark:text-red-500 text-xs"
          >
            勾選offer後請記得填優惠價
          </p>
        </FormItem>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="regularPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>原價</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter your regularPrice"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優惠價</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isDiscountPrice}
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter discountPrice"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>浴室</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter bathrooms"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>房間</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter bedrooms"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-500 text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default UpdateListingForm;
