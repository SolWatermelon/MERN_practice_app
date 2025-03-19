import React from "react";
import { Button } from "@/components/ui/button";

const PerListing = ({ name, createdAt, updatedAt, imageUrls }) => {
  return (
    <>
      <tr className="hover:bg-amber-100 dark:hover:bg-gray-400">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium flex gap-2 items-center">
            <img className="w-[60px] " src={imageUrls[0]} alt={imageUrls[0]} />
            <p>{name}</p>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm">{createdAt}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm">{updatedAt}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <Button variant="deletemode" size="sm">
            刪除
          </Button>
          <Button variant="signoutmode" size="sm">
            編輯
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PerListing;
