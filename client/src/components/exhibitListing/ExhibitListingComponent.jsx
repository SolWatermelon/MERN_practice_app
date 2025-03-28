import React, { useEffect } from "react";
import ExhibitListingHeader from "./ExhibitListingHeader";
import { useListingActions } from "../../hooks/useListingActions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExhibitListingBody from "./ExhibitListingBody";
import {acquireAllListings} from "@/slices/listingSlice.js"

const ExhibitListingComponent = () => {
  const { allListings } = useSelector((state) => state.allListingsReducer);
  const params = useParams();
  const listingId = params.listingId;
  const { getUnverifiedPerListQuery, refetchAllListingsQuery } = useListingActions(listingId);
  // const dispatch = useDispatch()
  const { data, isSuccess, isPending, isError, error, refetch } =
    getUnverifiedPerListQuery;


  useEffect(() => {
    // 手動重新執行 queryFn，重新獲取最新的 allListingsData
    // 回傳值是一個 Promise，執行後會回傳最新的 data
    // 與 useQuery 的自動執行不同，refetch() 允許手動觸發請求
    refetchAllListingsQuery()
  }, []);

  return (
    <div className="px-[70px]">
      <div className=" bg-white p-[20px] rounded-lg my-6 shadow-lg dark:text-gray-500">
      {isPending && <p>讀取中...</p>}
      {/* {isError && <p>{`錯誤！無法讀取頁面${error}`}</p>} */}
      {isSuccess && (
        <>
          <ExhibitListingBody unverifiedPerListingData={data} />
        </>
      )}
      </div>
    </div>
  );
};

export default ExhibitListingComponent;
