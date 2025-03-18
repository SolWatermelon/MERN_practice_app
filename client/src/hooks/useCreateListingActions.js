// import React, { useRef, useState } from "react";

export const useCreateListingActions = () => {
  //  upload mutation
  // const updateAvatar = useMutation({
  //   mutationFn: async (e) => {
  //     try {
  //       const file = e.target.files?.[0];
  //       if (!file) return null;

  //       const base64Image = await setFileToBase(file);
  //       const res = await axios.post("/api/avatar/upload", {
  //         ...currentUser,
  //         base64Image,
  //       });
  //       return res.data;
  //     } catch (error) {
  //       throw new Error(error.message);
  //     }
  //   },
  //   onSuccess: (data) => {
  //     if (!data) return;

  //     dispatch(
  //       updateUserSuccess({
  //         ...currentUser,
  //         avatar: data?.secure_url,
  //         updatedAt: data?._doc?.updatedAt,
  //       })
  //     );
  //   },
  // });
  return {};
};
