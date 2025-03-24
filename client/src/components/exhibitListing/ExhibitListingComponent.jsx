import React, { useEffect } from "react";
import ExhibitListingHeader from "./exhibitListingHeader";
import { useListingActions } from "../../hooks/useListingActions";
import { useParams } from "react-router-dom";
import ExhibitListingBody from "./ExhibitListingBody";

const ExhibitListingComponent = () => {
  const params = useParams();
  const listingId = params.listingId;
  const { getUnverifiedPerListQuery } = useListingActions(listingId);
  const { data, isSuccess, isPending, isError, error, refetch } =
    getUnverifiedPerListQuery;

  useEffect(() => {
    if (listingId && data) {
      console.log("listingId", listingId);
      console.log("unverifiedPerListingData~~~~~", data);
    }
    // getUnverifiedPerListQueryingMutation.mutate(listingId);
  }, [listingId]);

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
