import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const ListingForm = ({ form }) => {
  return (
    <>
      {/* Grid讓輸入欄位自動RWD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 文字輸入 - Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Name</FormLabel>
              <FormControl>
                <Input
                  className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                  placeholder="Enter your name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
            </FormItem>
          )}
        />

        {/* 文字輸入 - description */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">address</FormLabel>
              <FormControl>
                <Input
                  className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                  placeholder="Enter your address"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
            </FormItem>
          )}
        />

        {/* Textarea - description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-gray-700">description</FormLabel>
              <FormControl>
                <Textarea
                  className="w-full p-3 border-2 border-gray-400 text-gray-800  focus:outline-none focus:border-darkorange"
                  placeholder="Write your description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              {/* {fieldState.error?.message && (
        <p className="text-red-400 dark:text-red-400 text-sm">
          {fieldState.error.message}
        </p>
      )} */}
            </FormItem>
          )}
        />

        {/* Checkbox - Multiple Options */}
        <FormItem>
          <FormLabel>Select Options</FormLabel>
          <div className="space-y-2">
            {["furnished", "parking", "rent", "sell", "offer"].map((option) => (
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
                        if (checked) {
                          form.setValue("options", [...field.value, option]);
                        } else {
                          form.setValue(
                            "options",
                            field.value.filter((val) => val !== option)
                          );
                        }
                      }}
                    />
                    <FormLabel className="text-gray-700">{option}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
        </FormItem>

        {/* 使用Grid自動適應 */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          {/* Number Input - regularPrice */}
          <FormField
            control={form.control}
            name="regularPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>regularPrice</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter your regularPrice"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              </FormItem>
            )}
          />

          {/* Number Input - discountPrice */}
          <FormField
            control={form.control}
            name="discountPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>discountPrice</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter discountPrice"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              </FormItem>
            )}
          />

          {/* Number Input - bathrooms */}
          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bathrooms</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter bathrooms"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              </FormItem>
            )}
          />

          {/* Number Input - bedrooms */}
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>bedrooms</FormLabel>
                <FormControl>
                  <Input
                    className="w-full p-3 rounded-full border-2 border-gray-400 text-gray-800 focus:outline-none focus:border-darkorange"
                    type="number"
                    placeholder="Enter bedrooms"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400 dark:text-red-400 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ListingForm;
