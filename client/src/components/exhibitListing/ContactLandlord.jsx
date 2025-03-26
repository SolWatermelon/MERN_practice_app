import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import Contact from "./Contact";

const ContactLandlord = ({ unverifiedPerListingData }) => {
  const [openMessageArea, setOpenMessageArea] = useState(true);

  return (
    <>
      <div className="text-hoverlighttext bg-white shadow-md mb-16 md:sticky md:top-3 p-3 w-[200px] md:w-full">
        <div className="text-[16px] font-bold mb-2 flex items-center gap-2 justify-center">
          <FaEnvelopeOpenText />
          <p>連絡房東</p>
        </div>
        {openMessageArea ? (
          <button
            onClick={() => {
              setOpenMessageArea((prev) => !prev);
            }}
            type="button"
            className="w-full font-medium py-2 px-3 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors text-sm"
          >
            關閉新增留言
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenMessageArea((prev) => !prev);
            }}
            className="w-full font-medium py-2 px-3 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors text-sm"
          >
            開啟新增留言
          </button>
        )}

        <Contact openMessageArea={openMessageArea} unverifiedPerListingData={unverifiedPerListingData}/>
      </div>
      {/* )} */}
    </>
  );
};

export default ContactLandlord;
