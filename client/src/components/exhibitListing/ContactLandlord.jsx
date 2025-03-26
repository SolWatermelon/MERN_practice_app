import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import Contact from "./Contact";

const ContactLandlord = ({ unverifiedPerListingData }) => {
  const [openMessageArea, setOpenMessageArea] = useState(true);

  return (
    <>
      <div className="text-hoverlighttext my-20 p-3 flex flex-col items-center">
        <div className="font-bold text-xl mb-2 flex items-center gap-2 justify-center ">
          <FaEnvelopeOpenText />
          <p>連絡房東</p>
        </div>
        {openMessageArea ? (
          <button
            onClick={() => {
              setOpenMessageArea((prev) => !prev);
            }}
            type="button"
            className="w-[50%] font-medium py-2 px-3 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors text-sm"
          >
            關閉新增留言
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenMessageArea((prev) => !prev);
            }}
            className="w-[50%] font-medium py-2 px-3 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors text-sm"
          >
            開啟新增留言
          </button>
        )}

        <div className="w-full">
          <Contact
            openMessageArea={openMessageArea}
            unverifiedPerListingData={unverifiedPerListingData}
          />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default ContactLandlord;
