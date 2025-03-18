import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Pic = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  return (
    <>
      {currentUser.listingPicsSecureURL.length &&
        currentUser.listingPicsSecureURL.map((url) => {
          return (
            <div key={url} className="mt-5">
              <div className="w-[200px] bg-gray-300">
                <img
                  className="w-full h-full object-cover"
                  src={url}
                  alt="listing_pic"
                />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Pic;
