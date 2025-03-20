import React, { useEffect, useState } from "react";
import PerListing from "./perListing";
import { useSelector, useDispatch } from "react-redux";
import { useListingActions } from "../../hooks/useListingActions";
// import { useListingActions } from "../../hooks/useListingActions";

const ShowListingsComponent = () => {
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { getListingMutation, deleteListingMutation } = useListingActions();
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    getListingMutation.mutate(setUserListings);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-500 rounded-md">
      <div className=" rounded-lg shadow-lg overflow-hidden ">
        <div className=" px-6 py-4 bg-gray-300 dark:bg-gray-700">
          <h2 className="text-xl font-semibold text-center ">已發表房型列表</h2>
        </div>
        {!userListings[0]?._id && (
          <div className="text-lg text-center">尚無貼文...</div>
        )}
        {deleteListingMutation.isPending && (
          <p className="text-xs">處理中...</p>
        )}
        {deleteListingMutation.isSuccess && (
          <p className="text-blue-500 text-xs">刪除成功！</p>
        )}
        {deleteListingMutation.isError && (
          <p className="text-red-500 text-xs">刪除失敗</p>
        )}

        <div className="overflow-x-auto">
          {/* {<p>{userListings.msg}</p>} */}
          <table className="min-w-full divide-y divide-gray-400 dark:divide-gray-200">
            <thead className="bg-gray-200 dark:bg-gray-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  標題
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  建立時間
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                >
                  修改時間
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-500 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-200">
              {userListings[0]?._id &&
                userListings?.map((listing) => {
                  return (
                    <PerListing
                      key={listing._id}
                      listing={listing}
                      setUserListings={setUserListings}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowListingsComponent;
