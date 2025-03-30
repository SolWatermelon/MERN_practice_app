import React from "react";
import { useNavigate } from "react-router-dom";
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
import { useUserActions } from "../../hooks/useUserActions";

const AccountManagement = () => {
  const { deleteUser,  signoutUser } = useUserActions();
  const navigate = useNavigate();

  const handleSignout = () => {
    signoutUser.mutate(undefined, {
      onSuccess: () => {
        navigate("/sign-in", { replace: true });
      },
    });
  };

  const handleDeleteUser = () => {
    deleteUser.mutate(undefined, {
      onSuccess: () => {
        navigate("/sign-in", { replace: true });
      },
    });
  };

  return (
    <div className="flex tablet:flex-row flex-col justify-center items-center tablet:items-start box-content bg-white rounded-lg shadow-md">
      <div className="flex gap-6 flex-col justify-center items-center tablet:items-start px-8 pt-3 pb-16 md:p-8 w-[600px] max-w-md">
        <h1 className="text-gray-600 text-2xl font-extrabold">物件管理</h1>

        <button
          type="button"
          onClick={() => {navigate("/profile/create-listing")}}
          className="w-3/4 font-medium py-3 px-4 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
        >
          新增房源
        </button>

        <button
          type="button"
          onClick={() => {navigate("/profile/listings")}}
          className="w-3/4 font-medium py-3 px-4 border-2 border-darkorange text-darkblue hover:bg-hoverlighttext hover:text-white hover:border-hoverlighttext rounded-full transition-colors"
        >
          查看已發表房源
        </button>

        <p className="h-[0.8px] w-full bg-slate-500/30"></p>

        <h1 className="text-gray-600 text-2xl font-extrabold">帳戶管理</h1>

        <span className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="signoutmode" size="sm">
                登出帳戶
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>您確定要登出嗎？</DialogTitle>
                <DialogDescription>
                  登出後您需要重新登入才能使用完整功能
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive" onClick={handleSignout}>
                確認登出
                </Button>
              </DialogFooter>

              {signoutUser.isPending && (
                <div className="text-gray-500 text-sm">登出中...</div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="deletemode" size="sm">
                刪除帳戶
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>確定要刪除帳戶嗎？</DialogTitle>
                <DialogDescription>
                  此操作無法撤消。這將永久刪除您的帳戶並從我們的伺服器中移除您的數據。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={handleDeleteUser}
                  disabled={deleteUser.isPending}
                >
                  {deleteUser.isPending ? "刪除中..." : "確認刪除"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </span>
      </div>
    </div>
  );
};

export default AccountManagement;
