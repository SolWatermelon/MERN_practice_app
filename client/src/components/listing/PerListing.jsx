import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { useListingActions } from "../../hooks/useListingActions";
import { Link, useNavigate } from "react-router-dom";


const PerListing = ({ listing }) => {

  // const { getListingMutationTest, deleteListingMutation, userListings, setUserListings } = useListingActions();
  const navigate = useNavigate();
  const { deleteListingMutation, setUserListings } = useListingActions();

  const handleListingDelete = () => {
    const { imageUrls, _id } = listing;
    setUserListings((prev) => prev.filter((li) => li._id !== _id));
    deleteListingMutation.mutate({ imageUrls, _id });
  };

  return (
    <tr className="hover:bg-amber-100 dark:hover:bg-gray-400">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium flex gap-2 items-center">
          {/* .publicID */}
          {listing?.imageUrls[0]?.url ? (
            <Link
              to={`/profile/listing/${listing._id}`}
              className="hover:scale-[1.05] transition-transform duration-2000"
            >
              <img
                className="w-[50px]"
                src={listing.imageUrls[0]?.url}
                alt={listing.imageUrls[0]?.url}
              />
            </Link>
          ) : (
            <Link
              to={`/listing/${listing._id}`}
              className="hover:scale-[1.05] transition-transform duration-2000"
            >
              <span className="w-[50px] h-[50px] bg-slate-300 text-center text-gray-600">
                無圖
              </span>
            </Link>
          )}
          <Link
            to={`/profile/listing/${listing._id}`}
            className="hover:scale-[1.05] transition-transform duration-2000"
          >
            <p>{listing?.name}</p>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{listing?.updatedAt}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          {listing?.createdAt || "No date available"}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="deletemode" size="sm">
              刪除
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>確定要刪除貼文嗎？</DialogTitle>
              <DialogDescription>
                此操作無法撤消。這將永久刪除您的貼文
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleListingDelete} variant="destructive">
                確認刪除
                {/* {deleteUser.isPending ? "刪除中..." : "確認刪除"} */}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <Button variant="deletemode" size="sm">
            刪除
          </Button> */}
          
        <Button onClick={() => {navigate(`/profile/update-listing/${listing._id}`)}} variant="signoutmode" size="sm">
          編輯
        </Button>
      </td>
    </tr>
  );
};

export default PerListing;
