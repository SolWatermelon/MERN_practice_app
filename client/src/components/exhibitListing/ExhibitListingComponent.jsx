import React, { useEffect } from "react";
import ExhibitListingHeader from "./exhibitListingHeader";
import { useListingActions } from "../../hooks/useListingActions";
import { useParams } from "react-router-dom";

const ExhibitListingComponent = () => {
  const { getUnverifiedPerListingMutation, unverifiedPerListing } =
    useListingActions();
  const params = useParams();
  const listingId = params.listingId;

  useEffect(() => {
    getUnverifiedPerListingMutation.mutate(listingId);
    console.log("getUnverifiedPerListingMutation.isError", getUnverifiedPerListingMutation.isError);
  }, [listingId]);

  return (
    <div>
    {/* <p>{getUnverifiedPerListingMutation.isError}</p> */}
      {getUnverifiedPerListingMutation.isError && <p>唉唷 Something went wrong!</p>}
      {getUnverifiedPerListingMutation.isPending ? (
        <p>讀取中loading...</p>
      ) : (
        <ExhibitListingHeader getUnverifiedPerListingMutation={getUnverifiedPerListingMutation} />
      )}
    </div>
  );
};

export default ExhibitListingComponent;
