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

const PerListing = ({ setAllData, listing }) => {
  const { imageUrls, _id, name, createdAt, updatedAt } = listing;
  const navigate = useNavigate();
  const { deleteListingMutation } = useListingActions();

  const handleListingDelete = () => {
    deleteListingMutation.mutate({ imageUrls, _id });
      setAllData((prev) =>
        prev.filter((perData) => {
          return perData._id !== _id;
        })
      );
  };

  return (
    <tr className="hover:bg-amber-100 dark:hover:bg-gray-400">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium flex gap-2 items-center">
          {/* .publicID */}
          {imageUrls[0]?.url ? (
            <Link
              to={`/listing/${_id}`}
              className="hover:scale-[1.05] transition-transform duration-2000"
            >
              <img
                className="w-[50px]"
                src={imageUrls[0]?.url}
                alt={imageUrls[0]?.url}
              />
            </Link>
          ) : (
            <Link
              to={`/listing/${_id}`}
              className="hover:scale-[1.05] transition-transform duration-2000"
            >
              <span className="w-[50px] h-[50px] bg-slate-300 text-center text-gray-600">
                無圖
              </span>
            </Link>
          )}
          <Link
            to={`/listing/${_id}`}
            className="hover:scale-[1.05] transition-transform duration-2000"
          >
            <p>{name}</p>
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{createdAt}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">{updatedAt || "No update date"}</div>
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
        <Button
          onClick={() => {
            navigate(`/profile/update-listing/${_id}`);
          }}
          variant="signoutmode"
          size="sm"
        >
          編輯
        </Button>
      </td>
    </tr>
  );
};

export default PerListing;
