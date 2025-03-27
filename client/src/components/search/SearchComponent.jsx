import React, { useEffect, useState } from "react";
import PerSearchResultCard from "./PerSearchResultCard";
import SearchForm from "./SearchForm";
import { useSelector, useDispatch } from "react-redux";
import { useListingActions } from "@/hooks/useListingActions";
import { filteredAllListings } from "@/slices/listingSlice";
import { useSearchParams } from "react-router-dom";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refetchAllListingsQuery } = useListingActions();
  const [pagination, setPagination] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { allListings, filteredListing } = useSelector(
    (state) => state.allListingsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    refetchAllListingsQuery();
  }, []);

  useEffect(() => {
    if (!allListings || allListings.length === 0) return;
    // 如果不是透過navbar搜尋時的資料呈現
    const searchKeyword = searchParams?.get("searchKeyword");
    if (!searchKeyword) {
      dispatch(filteredAllListings(allListings));
    }
  }, [allListings]);

  useEffect(() => {
    if (!filteredListing || filteredListing.length === 0) return;
    console.log("filteredListing", filteredListing);
    // 一頁9筆(頁碼數)
    const PageAmount = Math.ceil(filteredListing.length / 9);
    const pageAmountArr = Array.from({ length: PageAmount }, (_, index) => {
      return index + 1;
    });
    console.log("pageAmountArr", pageAmountArr);
    setPagination(pageAmountArr);

    // 第一頁
    const slicedData = filteredListing.slice(1 * 10 - 1 - 9, 1 * 10 - 1);
    setFilteredData(slicedData);
  }, [filteredListing]);

  const handlePerPageData = (page) => {
    console.log("嗨嗨", page);
    // 一頁9筆(po文呈現)
    const slicedData = filteredListing.slice(
      page * 10 - page - 9,
      page * 10 - page
    );
    setFilteredData(slicedData);
  };

  return (
    <>
      {!allListings?.length && !filteredListing?.length ? (
        <p>讀取中...</p>
      ) : (
        <div className="search-res-page rounded-md shadow-md p-6 bg-gray-50 flex gap-6 flex-col items-center md:items-start  md:justify-start md:flex-row text-gray-500">
          <SearchForm
            className="w-full"
            filteredData={filteredData}
            setFilteredData={setFilteredData}
            pagination={pagination}
          />
          <div className="px-5 flex-grow">
            <div className=" text-[20px] md:text-[40px]  border-white border-b-8 font-extrabold text-white">
              <span>所有房屋</span>
            </div>
            <div className="flex gap-4 flex-wrap justify-center p-6">
              {filteredData?.length ? (
                filteredData?.map((listing, i) => {
                  return (
                    <PerSearchResultCard listing={listing} key={listing._id} />
                  );
                })
              ) : (
                <p className="text-white">無搜尋結果</p>
              )}
            </div>
            <div className="w-full text-center">
              {!!pagination?.length ? (
                pagination.map((page) => {
                  return (
                    <button
                    className="bg-gray-500 text-white mx-1 px-2 rounded-md hover:bg-hoverlighttext hover:text-white "
                      key={page}
                      type="button"
                      onClick={() => {
                        handlePerPageData(page);
                      }}
                    >
                      {page}
                    </button>
                  );
                })
              ) : (
                <p>無法載入頁碼</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchComponent;
