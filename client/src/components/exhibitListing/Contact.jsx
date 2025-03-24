import React, { useEffect, useState } from "react";
import { useUserActions } from "@/hooks/useUserActions";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";

const Contact = ({ openMessageArea, unverifiedPerListingData }) => {
  const { getLandlordInfoQuery } = useUserActions(
    unverifiedPerListingData?.userRef
  );
  const [message, setMessage] = useState("");
  const {
    data: landlordInfo,
    isSuccess: getlandLordSuccess,
    isPending,
    isError: getlandLordError,
    error: getlandLordErrorMsg,
  } = getLandlordInfoQuery;

  // const { _doc: actualLandlordData } = landlordInfo;

  const handleMessageChange = (e) => {
    console.log("e.target.value", e.target.value);
    setMessage(e.target.value);
  };

  // useEffect(() => {
  //   // getLandlordUserInfoMutation.mutate(userRef);
  //   console.log("landlordInfo~~~~", landlordInfo);
  // }, [getlandLordSuccess]);


  useEffect(() => {
    setMessage(openMessageArea&&"")
  }, [openMessageArea])

  return (
    <>
      {unverifiedPerListingData?._id && getlandLordSuccess && (
        <>
          <div className="h-[1px] w-full bg-gray-300 mt-4"></div>
          <div
            className={`text-gray-500 mt-4 text-xs transition-all duration-300 ${
              openMessageArea ? "opacity-100" : "h-0 opacity-0 overflow-hidden"
            }`}
          >
            <p>
              <span className="font-semibold block">
                聯絡房東：{landlordInfo?._doc?.username}
              </span>
              <span className="font-semibold block">
                諮詢物件：{unverifiedPerListingData?.name.toLowerCase()}
              </span>
            </p>
            <textarea
              name="messageToLandlord"
              id="messageToLandlord"
              placeholder="輸入留言..."
              value={message}
              onChange={(e) => handleMessageChange(e)}
              className="border border-gray-400 rounded-xl resize-none p-2 w-full min-h-[80px] text-sm mt-1"
            ></textarea>
            <a
              className="text-2xl text-blue-400 hover:text-blue-500 flex justify-end"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${landlordInfo?._doc?.email}&su=關於:${unverifiedPerListingData?.name}&body=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoIosSend className="transition-transform duration-3000 hover:scale-[1.3]" />
            </a>
          </div>
        </>
      )}
      {getlandLordError && <p>錯誤:${getlandLordErrorMsg}</p>}
    </>
  );
};

export default Contact;
