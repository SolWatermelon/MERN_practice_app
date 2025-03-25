import React from "react";
import { useForm } from "react-hook-form";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: "",
      type: "",
      amenities: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Search submitted:", data);
  };

  return (
    <div className="max-w-md mb-6 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Search Term Input */}
        <div>
          <input
            {...register("searchTerm")}
            placeholder="Search Term"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.searchTerm && (
            <p className="text-red-500 text-sm mt-1">
              {errors.searchTerm.message}
            </p>
          )}
        </div>

        {/* Type Checkboxes */}
        <div className="flex space-x-4 dark:text-white">
          {["Rent & sell","Rent", "Sale", "Offer"].map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="radio"
                value={type}
                {...register("type")}
                className="form-radio"
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>

        {/* Amenities Checkboxes - 可多選 */}
        <div className="flex space-x-4 dark:text-white">
          {["Parking", "Furnished"].map((amenity) => (
            <label key={amenity} className="inline-flex items-center">
              <input
                type="checkbox"
                value={amenity}
                {...register("amenities")}
                className="form-checkbox"
              />
              <span className="ml-2">{amenity}</span>
            </label>
          ))}
        </div>

        {/* Sort */}
        <div>
          <select
            {...register("sort")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Latest">Latest</option>
            <option value="PriceAsc">Price (Low to High)</option>
            <option value="PriceDesc">Price (High to Low)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full font-medium py-3 px-4 bg-gray-500 hover:bg-gray-400 text-white rounded-full transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
