import ShowListingsComponent from "@/components/listing/ShowListingsComponent";
import React, { useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useListingActions } from "../hooks/useListingActions";

const ShowListings = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { getListingMutation } = useListingActions();

  useEffect(() => {
    getListingMutation.mutate()
  },[])
  return <div><ShowListingsComponent/></div>;
};

export default ShowListings;

// 67d7e874f8e5219c27032ba8