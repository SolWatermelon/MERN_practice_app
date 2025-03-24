import React, { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/useUserActions";

const Contact = ({ openMessageArea, listingData }) => {
  const { getLandlordUserInfoMutation } = useUserActions();
//   const { userRef } = listingData;

  useEffect(() => {
    // getLandlordUserInfoMutation.mutate(userRef);
    console.log("listingData", listingData)
  }, []);

  return (
    <>
      {listingData?._id && (
        <div hidden={openMessageArea} className="mt-2 h-[70px]">
          <textarea
            name="messageToLandlord"
            id="messageToLandlord"
            placeholder="輸入留言..."
            className="border border-gray-400 rounded-xl resize-none p-2 w-full h-full text-sm"
          ></textarea>
        </div>
      )}
    </>
  );
};

export default Contact;
