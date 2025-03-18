import React, { useState, useEffect } from "react";
// import {useState} from ""
// import { useSelector, useDispatch } from "react-redux";

const Pic = ({ previewImages, setPreviewImages}) => {
  //   const { currentUser } = useSelector((state) => state.userReducer);
//   const [imgs, setImgs] = useState([]);
  const removeFile = (index) => {
    console.log("index", index);
    console.log("previewImages", previewImages);
    // const newImgs = [...imgs];
    const newImgs = structuredClone(previewImages);
    newImgs.splice(index, 1);
    console.log("newImgs:", newImgs);
    setPreviewImages(newImgs);
  };

//   useEffect(() => {
//     setPreviewImages([ ,...previewImages]);
//   }, []);

  return (
    <>
      {previewImages.map((src, index) => (
        <div key={index} className="mt-9">
          <img src={src.srcs} className="w-24 h-24 object-cover" />
          <button
            type="button"
            className="ml-2 text-xs text-red-400"
            onClick={() => removeFile(index)}
          >
            删除
          </button>
        </div>
      ))}
    </>
  );
};

export default Pic;
