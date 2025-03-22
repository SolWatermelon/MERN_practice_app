import React from "react";
//  import { useSelector, useDispatch } from "react-redux";

const Pic = ({ url, index }) => {
  //  const { currentUser } = useSelector((state) => state.userReducer);

  // const removePic = (index) => {
  //   console.log("index", index);
  //   console.log("previewImages", previewImages);
  //   // const newImgs = [...imgs];
  //   const newImgs = structuredClone(previewImages);
  //   newImgs.splice(index, 1);
  //   console.log("newImgs:", newImgs);
  //   setPreviewImages(newImgs);
  // };

  return (
    // <>
    <div className="mt-5">
      <div className="w-[200px] bg-gray-300">
        <img
          className="w-full h-[100px] object-contain"
          src={url}
          alt={`listing_pic${index}`}
        />
      </div>
    </div>
    // </>
  );
};

export default Pic;
