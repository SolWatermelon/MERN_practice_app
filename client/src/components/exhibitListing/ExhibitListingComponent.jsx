import React, { useEffect } from "react";
import ExhibitListingHeader from "./exhibitListingHeader";
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
    // allListingsDataRefetch().then(({ data }) => {
    //   if (data) {
    //     console.log("最新的 allListingsData:", data.allListings);
    //     dispatch(acquireAllListings(data.allListings));
    //   }
    // });
    refetchAllListingsQuery()
  }, []);

  return (
    <div>
      {/* {getUnverifiedPerListQueryingMutation.isError && <p>唉唷 Something went wrong!</p>}
      {getUnverifiedPerListQueryingMutation.isPending ? (
        <p>讀取中loading...</p>
      ) : (
        <>
        <ExhibitListingHeader getUnverifiedPerListQueryingMutation={getUnverifiedPerListQueryingMutation} />
        <ExhibitListingBody getUnverifiedPerListQueryingMutation={getUnverifiedPerListQueryingMutation}/>
        </>
      )} */}
      {isPending && <p>讀取中...</p>}
      {isError && <p>{`錯誤！無法讀取頁面${error}`}</p>}
      {isSuccess && (
        <>
          <ExhibitListingHeader unverifiedPerListingData={data} />
          <ExhibitListingBody unverifiedPerListingData={data} />
        </>
      )}
    </div>
  );
};

export default ExhibitListingComponent;
