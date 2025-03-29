import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { filteredAllListings } from "@/slices/listingSlice";
import { useSelector, useDispatch } from "react-redux";

const SearchForm = ({ setFilteredData, filteredData, pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryVal = searchParams.get("searchKeyword");
  const { allListings } = useSelector((state) => state.allListingsReducer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchTerm: "",
      // Rent, Sale, Offer
      type: "",
      //   "Parking", "Furnished"
      amenities: [],
      // sort: "",
      // order: "",
    },
  });

  const getAllParams = () => {
    const allParams = [];
    for (let entry of searchParams.entries()) {
      allParams.push(entry);
    }
    // 用計算屬性，key是動態的！
    const newAllParams = allParams.map((param) => {
      return { [param[0]]: param[1] };
    });
    return newAllParams;
  };

  useEffect(() => {
    // 預設情況下，setValue不會觸發表單重新驗證或更新
    // 預設情況下，setValue不會觸發表單的 onChange 事件
    // 需要使用額外參數來控制表單的行為，以下這些參數確保表單狀態被正確更新，並觸發必要的重新渲染
    // setValue("type", value, {
    // shouldValidate: true,  // 觸發驗證
    // shouldDirty: true,     // 標記欄位為已更改
    // shouldTouch: true      // 標記欄位已被觸碰
    // });
    // ==================================
    // 搜尋關鍵字
    const searchKeyword = searchParams.get("searchKeyword");
    if (searchKeyword) {
      setValue("searchTerm", searchKeyword);
    }

    // 類型
    const type = searchParams.get("type");
    if (type) {
      // 確定值和radio對得上
      setValue("type", type.charAt(0).toUpperCase() + type.slice(1), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    // 停車位和傢俱
    const parking = searchParams.get("parking");
    const furnished = searchParams.get("furnished");

    const currentAmenities = [];
    if (parking === "true") {
      currentAmenities.push("Parking");
    }
    if (furnished === "true") {
      currentAmenities.push("Furnished");
    }
    if (currentAmenities.length > 0) {
      setValue("amenities", currentAmenities);
    }

    // [setValue]是防止不必要的重複渲染
  }, [searchParams, setValue]);

  const filterData = () => {
    const allParams = getAllParams();
    const newSearchRes = allListings.filter((listing) =>
      allParams.every((param) => {
        const [key, value] = Object.entries(param)[0];
        console.log("key", key);
        console.log("value", value);

        switch (key) {
          case "searchKeyword":
            return (listing.name + listing.description)
              .toLowerCase()
              .includes(value.toLowerCase());

          case "type":
            const newOffer = listing.offer && "offer";
            return (
              value.toLowerCase() === "all" ||
              listing.type.toLowerCase() === value.toLowerCase() ||
              newOffer === value.toLowerCase()
            );

          case "parking":
            return listing.parking.toString() === value;

          case "furnished":
            return listing.furnished.toString() === value;

          default:
            return true;
        }
      })
    );
    if (!newSearchRes.length) {
      dispatch(filteredAllListings([]));
      setFilteredData([]);
    }

    dispatch(filteredAllListings(newSearchRes));

    let slicedData = [];
    pagination.forEach((page) => {
      slicedData = newSearchRes.slice(page * 10 - page - 9, page * 10 - page);
      setFilteredData((prev) => [...prev, ...slicedData]);
    });
  };

  const setUrlQueries = (data) => {
    const { searchTerm, type, amenities, sort } = data;

    // 設關鍵字
    if (searchTerm) {
      searchParams.set("searchKeyword", searchTerm);
    }

    searchParams.set(
      "type",
      (type.toLowerCase() === "sell" && "sell") ||
        (type.toLowerCase() === "offer" && "offer") ||
        (type.toLowerCase() === "rent" && "rent") ||
        "all"
    );

    // 設amenities
    if (amenities.includes("Parking")) {
      searchParams.set("parking", "true");
    }
    if (amenities.includes("Furnished")) {
      searchParams.set("furnished", "true");
    }

    // 更新query
    setSearchParams(searchParams);

    // 篩選
    filterData();
  };

  const onSubmit = (data) => {
    [...searchParams.keys()].forEach((key) => {
      searchParams.delete(key);
    });

    // 表單沒填回傳全部資料
    if (
      !data?.amenities?.length &&
      // !data?.order &&
      !data?.searchTerm &&
      // !data?.sort &&
      data?.type === "All"
    ) {
      dispatch(filteredAllListings(allListings));
      setFilteredData(filteredData);
      setSearchParams({});
      return;
    }

    setUrlQueries(data);
  };

  return (
    <div className="w-full max-w-md mb-6 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* searchTerm input */}
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

        {/* type radio */}
        <div className="flex space-x-4 dark:text-white">
          {["Rent", "Sell", "Offer"].map((type) => (
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

        {/* checkbox*/}
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

        {/* submit */}
        <button
          type="submit"
          className="w-full font-medium py-3 px-4 bg-gray-500 hover:bg-gray-400 text-white rounded-full transition-colors"
        >
          Search
        </button>
        {/* reset */}
        <button
          type="button"
          onClick={() => {
            setSearchParams({});
            reset({
              searchTerm: "",
              type: "",
              amenities: [],
              sort: "",
            });
            dispatch(filteredAllListings(allListings));
            setFilteredData(filteredData);
          }}
          className="w-full font-medium dark:text-white py-3 px-4 border-4  border-gray-400 hover:bg-gray-400 text-gray-600 hover:text-white rounded-full transition-colors"
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
