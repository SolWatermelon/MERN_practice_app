import React, { useEffect, useState } from "react";
import PerListing from "./perListing";
import { useSelector, useDispatch } from "react-redux";
import { useListingActions } from "../../hooks/useListingActions";
import {acquireAllListings} from "../../slices/listingSlice.js"
// import { useListingActions } from "../hooks/useListingActions";
// import { useListingActions } from "../../hooks/useListingActions";

const ShowListingsComponent = () => {
  const { allListings } = useSelector((state) => state.allListingsReducer);
const dispatch = useDispatch()
  // const { getAllListingsQuery } = useListingActions();
  const {
    // allListingsData,
    // allListingsDataPending,
    // allListingsDataError,
    // isAllListingsDataError,
    // isAllListingsDataSuccess,
    // getAllListingsQuery,
    refetchAllListingsQuery,
    getCertainUserAllListingsQuery,
    deleteListingMutation,
  } = useListingActions();
  // const {
  //   refetch:allListingsDataReftch,
  //   data: allListingsData,
  //   isPending: isAllListingsPending,
  //   isSuccess: isAllListingsSuccess,
  //   isError: isAllListingsError,
  //   error: allListingsErrorMsg,
  // } = getAllListingsQuery;
  // const [userListings, setUserListings] = useState([]);
  const { data, isPending, error, isError, isSuccess, refetch } =
    getCertainUserAllListingsQuery;
    // useEffect(() => {
    //   allListingsDataReftch()
    //   console.log("isAllListingsSuccess", isAllListingsSuccess)
    //   if(isAllListingsSuccess){
    //     dispatch(acquireAllListings(allListingsData?.allListings))
    //     console.log("allListingsData?.allListings~~:", allListingsData?.allListings)
    //   }
  
    // }, [isAllListingsSuccess]);

    useEffect(() => {
      refetchAllListingsQuery();
    }, [])

  return (
    <>
      {isPending && <p>loading...</p>}
      {isSuccess && (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-500 rounded-md mt-9">
          <div className=" rounded-lg shadow-lg overflow-hidden ">
            <div className=" px-6 py-4 bg-gray-300 dark:bg-gray-700">
              <h2 className="text-xl font-semibold text-center ">
                已發表房型列表
              </h2>
            </div>
            {!data[0]?._id && (
              <div className="text-lg text-center">尚無貼文...</div>
            )}
            {deleteListingMutation.isPending && (
              <p className="text-xs">處理中...</p>
            )}
            {deleteListingMutation.isSuccess && (
              <p className="text-blue-500 text-xs">刪除成功！</p>
            )}
            {deleteListingMutation.isError && (
              <p className="text-red-500 text-xs">刪除失敗</p>
            )}

            <div className="overflow-x-auto">
              {/* {<p>{data.msg}</p>} */}
              <table className="min-w-full divide-y divide-gray-400 dark:divide-gray-200">
                <thead className="bg-gray-200 dark:bg-gray-600">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      標題
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      建立時間
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      修改時間
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {data[0]?._id &&
                    data?.map((listing) => {
                      return <PerListing key={listing._id} listing={listing} />;
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {isError && <p>{`無法抓取資料:${error}`}</p>}
    </>
  );
};

export default ShowListingsComponent;
