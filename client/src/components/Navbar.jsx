import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
// , useDispatch 
import { useSelector, useDispatch} from "react-redux";
import {toggleMenu} from "../slices/navToggleSlice.js"

const Navbar = () => {
  const { isOpened } = useSelector((state) => state.navToggleReducer);
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
      className="w-full bg-white shadow-md relative"
      onClick={() => {
        dispatch(toggleMenu());
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-extrabold">
            <span className="underline decoration-4 decoration-pink-500/30">
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
                  className="w-64 px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-pink-300"
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
              <Link to="/" className="hover:text-purple-500">
                Home
              </Link>
              <Link to="/about" className="hover:text-purple-500">
                About
              </Link>
              <Link to="/news" className="hover:text-purple-500">
                News
              </Link>
              <Link to="/sign-in">
                <button className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-1 rounded-full transition-colors">
                  Sign In
                </button>
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
                  className="w-44 px-3 py-1 text-sm rounded-full border-2 border-gray-300 focus:outline-none focus:border-pink-300"
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

          {/* 大頭貼 */}
          <div className="relative">
            <button
              onClick={handleAvatarToggle}
              className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center relative"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
            </button>

            {/* 使用者小卡 */}
            {isAvatarOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50"
                onClick={handleMenuContentClick}
              >
                <div className="flex flex-col items-center">
                  <p className="text-gray-600 mb-2">xxx123@gmail.com</p>
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-2"></div>
                  <div className="flex items-center mb-2">
                    <span className="font-medium">xxx您好</span>
                  </div>
                  <button className="text-pink-500 text-sm mb-4">
                    編輯或管理個人資料
                  </button>
                  <button className="w-full py-2 bg-pink-100 text-gray-800 rounded-lg hover:bg-pink-200 transition-colors">
                    登出
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 漢堡按鈕 */}
          <div className="md:hidden ml-3">
            <button
              onClick={handleMenuToggle}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <span className="text-xl">x</span>
              ) : (
                <span>三</span>
              )}
            </button>

            {/* 漢堡內容 */}
            {isMenuOpen && (
              <div
                className="absolute top-16 right-0 left-0 bg-purple-50 z-40"
                onClick={handleMenuContentClick}
              >
                <div className="flex flex-col items-center py-8 space-y-6">
                  <p className="text-pink-500">MENU</p>
                  <Link
                    to="/"
                    className="text-lg hover:text-purple-500 transition-all"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-lg hover:text-purple-500 transition-all"
                  >
                    About
                  </Link>
                  <Link
                    to="/news"
                    className="text-lg hover:text-purple-500 transition-all"
                  >
                    News
                  </Link>
                  <Link to="/sign-in">
                    <button className="bg-purple-300 hover:bg-purple-400 text-white px-4 py-1 rounded-full transition-colors">
                      Sign In
                    </button>
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
