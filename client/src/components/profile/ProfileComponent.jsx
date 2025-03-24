import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileEdit from "./ProfileEdit";
import AccountManagement from "./AccountManagement";
import { useListingActions } from "../../hooks/useListingActions";

const ProfileComponent = () => {
  const { refetchAllListingsQuery } = useListingActions();
  useEffect(() => {
    refetchAllListingsQuery();
  }, []);
  return (
    <div className="flex justify-center mt-12">
      <Tabs defaultValue="edit" className="flex flex-col items-start">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="edit">編輯資料</TabsTrigger>
          <TabsTrigger value="accountandarticle">帳戶與文章</TabsTrigger>
        </TabsList>

        <TabsContent className="mb-24 xl:w-[700px]" value="edit">
          {/* <ProfileEdit /> */}
          <ProfileEdit />
        </TabsContent>

        <TabsContent
          className="xl-24 mobile:w-[330px] md:w-[500px] xl:w-[700px]"
          value="accountandarticle"
        >
          {/* <AccountManagement /> */}
          <AccountManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileComponent;
