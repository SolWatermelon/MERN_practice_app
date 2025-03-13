import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
// , useDispatch
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../slices/navToggleSlice.js";
import { ModeToggle } from "./mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { isOpened } = useSelector((state) => state.navToggleReducer);
  const { currentUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    // 打開漢堡時關閉使用者小卡
    if (!isMenuOpen) {
      setIsAvatarOpen(false);
    }
  };

  const handleAvatarToggle = (e) => {
    e.stopPropagation();
    setIsAvatarOpen(!isAvatarOpen);
    // 打開使用者小卡時關閉漢堡
    if (!isAvatarOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuContentClick = (e) => {
    e.stopPropagation();
  };

  // 點nav任一處關閉所有
  const handleGlobalClick = () => {
    setIsMenuOpen(false);
    setIsAvatarOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("搜尋");
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAvatarOpen(false);
  }, [isOpened]);

  return (
    <header
      className="w-full bg-orange dark:bg-slate-900 shadow-md relative"
      onClick={() => {
        dispatch(toggleMenu());
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-lg md:text-2xl font-extrabold">
            <span className="underline decoration-4 decoration-darkorange">
              99房屋
            </span>
          </Link>

          {/* 電腦裝置menu */}
          <div
            className="hidden md:flex items-center space-x-8"
            onClick={handleMenuContentClick}
          >
            {/* 搜尋 */}
            <div className="relative">
              <form
                onSubmit={handleSubmit(handleSearchSubmit)}
                className="flex items-center"
              >
                {/* border-gray-300 focus:outline-none focus:border-pink-300 */}
                <input
                  type="text"
                  placeholder="search"
                  className="dark:text-gray-900 w-64 px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-darkorange"
                  {...register("search")}
                />
                <button
                  type="submit"
                  className="absolute right-3 text-slate-600 hover:text-slate-400"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <nav className="flex items-center space-x-6">
              <Link to="/" className="hover:text-hoverlighttext">
                Home
              </Link>
              <Link to="/about" className="hover:text-hoverlighttext">
                About
              </Link>
              <Link to="/news" className="hover:text-hoverlighttext">
                News
              </Link>
            </nav>
          </div>

          {/* 手機 */}
          <div
            className="flex md:hidden items-center space-x-3"
            onClick={handleMenuContentClick}
          >
            {/* 搜尋 */}
            <div className="relative">
              <form
                onSubmit={handleSubmit(handleSearchSubmit)}
                className="flex items-center"
              >
                <input
                  type="text"
                  placeholder="search"
                  // dark:text-gray-900 w-64 px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-darkorange
                  className="dark:text-gray-900 w-32 px-3 py-1 text-sm rounded-full border-2 border-gray-300 focus:outline-none focus:border-darkorange"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <button
                  type="submit"
                  className="absolute right-2 text-slate-600 hover:text-slate-400 text-sm"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>

          <div className="flex gap-3 justify-center items-center">
            {/* 切換dark mode */}
            <ModeToggle />

            {/* 使用者資料popup */}
            <Popover>
              <PopoverTrigger>
                {currentUser?._id ? (
                  <div>
                    <img
                      className="w-10 h-10 rounded-full object-cover bg-gray-300 flex items-center justify-center relative"
                      src={currentUser?.avatar}
                      alt="profile_pic"
                    />
                    <span className="absolute top-2 w-3 h-3 bg-red-400 rounded-full"></span>
                  </div>
                ) : (
                  <Link to="/sign-in">
                    <button
                      type="button"
                      className="px-2 py-1 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </PopoverTrigger>
              <PopoverContent className="dark:bg-white text-darkblue">
                <div className="flex items-center justify-center mb-2">
                  <span className="font-medium">
                    {currentUser.username}，您好
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center justify-center"
                >
                  <button className="text-hoverlighttext text-sm mb-4">
                    編輯或管理個人資料
                  </button>
                </Link>
                <Link className="w-full" to="/">
                  <button
                    type="button"
                    className="w-full py-2 bg-darkorange text-darkblue rounded-lg hover:bg-hoverlighttext transition-colors"
                  >
                    登出
                  </button>
                </Link>
              </PopoverContent>
            </Popover>

            {/* 漢堡開關 */}
            <button
              onClick={handleMenuToggle}
              className="dark:text-white text-gray-700 focus:outline-none flex md:hidden"
            >
              {isMenuOpen ? (
                <span className="text-xl pr-">x</span>
              ) : (
                <span className="pr-1">三</span>
              )}
            </button>

            {/* 漢堡內容 */}
            {isMenuOpen && (
              <div
                className="absolute top-16 right-0 left-0 bg-amber-100 dark:bg-darkblue z-40"
                onClick={handleMenuContentClick}
              >
                <div className="flex flex-col items-center py-8 space-y-6">
                  <p className="text-darkorange">MENU</p>
                  <Link
                    to="/"
                    className="text-lg hover:text-hoverlighttext transition-all"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-lg hover:text-hoverlighttext transition-all"
                  >
                    About
                  </Link>
                  <Link
                    to="/news"
                    className="text-lg hover:text-hoverlighttext transition-all"
                  >
                    News
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
