import React, { useEffect } from "react";
import PerSearchResultCard from "./PerSearchResultCard";
import SearchForm from "./SearchForm";
import { useSelector, useDispatch } from "react-redux";
import { useListingActions } from "@/hooks/useListingActions";
import { acquireAllListings, filteredAllListings } from "@/slices/listingSlice";
import { useSearchParams, useLocation } from "react-router-dom";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refetchAllListingsQuery } = useListingActions();
  const { allListings, filteredListing } = useSelector(
    (state) => state.allListingsReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    refetchAllListingsQuery();
  }, []);

  useEffect(() => {
    console.log("allListings", allListings);
    console.log("filteredListing", filteredListing);
    // dispatch(filteredAllListings(allListings))

    // 如果不是透過navbar搜尋時的資料呈現
    const searchKeyword = searchParams?.get("searchKeyword");
    if (!searchKeyword) {
      dispatch(filteredAllListings(allListings));
    }
  }, [allListings?.length, !filteredListing?.length]);

  return (
    <>
      {/* {filteredListing?.length? "有":"沒有"} */}
      {!allListings?.length && !filteredListing?.length ? (
        <p>讀取中...</p>
      ) : (
        <div className="search-res-page rounded-md shadow-md p-6 bg-gray-50 flex gap-6 flex-col md:flex-row text-gray-500">
          <SearchForm />
          <div className="px-5 flex-grow">
            <div className=" text-[20px] md:text-[40px]  border-white border-b-8 font-extrabold text-white">
              <span>所有房屋</span>
            </div>
            <div className="flex gap-4 flex-wrap justify-center p-6">
              {filteredListing?.length &&
                filteredListing?.map((listing, i) => {
                  return (
                    <PerSearchResultCard listing={listing} key={listing._id} />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
