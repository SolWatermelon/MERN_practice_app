import React, { useEffect } from "react";
import { useListingActions } from "../../hooks/useListingActions";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ExhibitListingBody from "./ExhibitListingBody";

const ExhibitListingComponent = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const params = useParams();
  const listingId = params.listingId;
  const { getUnverifiedPerListQuery, refetchAllListingsQuery } =
    useListingActions(listingId);
  const { data, isSuccess, isPending, refetch } = getUnverifiedPerListQuery;

  useEffect(() => {
    // 回傳值是一個Promise，執行後會回傳最新的data
    // 與useQuery 的自動執行不同，refetch()可以手動觸發請求
    refetchAllListingsQuery();
  }, []);

  return (
    <div>
      {!currentUser?.id && isPending && "oops！請先登入網站以解鎖更多資訊唷"}
      <div className="rounded-lg shadow-lg dark:text-gray-500">
        {isPending && currentUser?.id && (
          <p className="dark:text-white">讀取中...</p>
        )}
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
