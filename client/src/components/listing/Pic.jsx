import React from "react";

const Pic = ({ url, index }) => {

  return (
    <div className="mt-5">
      <div className="w-[200px] bg-gray-300">
        <img
          className="w-full h-[100px] object-contain"
          src={url}
          alt={`listing_pic${index}`}
        />
      </div>
    </div>
  );
};

export default Pic;
