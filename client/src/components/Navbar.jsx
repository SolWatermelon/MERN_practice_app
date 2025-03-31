import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  filteredAllListings,
  acquireAllListings,
} from "@/slices/listingSlice.js";
import { toggleMenu } from "@/slices/navToggleSlice.js";
import { ModeToggle } from "./mode-toggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const { isOpened } = useSelector((state) => state.navToggleReducer);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { allListings } = useSelector((state) => state.allListingsReducer);
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchQueryVal = searchParams.get("searchKeyword");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsAvatarOpen(false);
    }
  };

  const handleAvatarToggle = (e) => {
    e.stopPropagation();
    setIsAvatarOpen(!isAvatarOpen);
    if (!isAvatarOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuContentClick = (e) => {
    e.stopPropagation();
  };

  const handleGlobalClick = () => {
    setIsMenuOpen(false);
    setIsAvatarOpen(false);
  };

  useEffect(() => {
    setShowNav(location.pathname === "/search/" ? false : true);
  }, [location.pathname]);

  const filterData = (searchKeyword) => {
    // listing name or description filter
    const filteredListings = allListings.filter((listing) => {
      const nameAndDescription = listing.name + listing.description;
      return nameAndDescription.includes(searchKeyword);
    });
    dispatch(filteredAllListings(filteredListings));
    // searchkeyword attach to query value
    navigate(`/search/?searchKeyword=${searchKeyword}`);
  };

  const handleSearchSubmit = (data) => {
    if (data?.search) {
      const searchKeyword = data.search;
      filterData(searchKeyword);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAvatarOpen(false);
  }, [isOpened]);

  useEffect(() => {
    setValue("search", searchQueryVal);
  }, [searchQueryVal]);

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

          {/* menu */}
          <div
            className="md:flex items-center space-x-8"
            onClick={handleMenuContentClick}
          >
            {/* 搜尋 */}
            {showNav && (
              <div className="relative">
                <form
                  onSubmit={handleSubmit(handleSearchSubmit)}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="search"
                    className="dark:text-gray-900 w-[150px] tablet:w-64 px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-darkorange"
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
            )}

            <nav className="hidden md:block flex items-center space-x-6">
              <Link to="/" className="hover:text-hoverlighttext">
                Home
              </Link>
              <Link to="/about" className="hover:text-hoverlighttext">
                About
              </Link>
            </nav>
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
                      className="w-8 h-10 rounded-full object-cover bg-gray-300 flex items-center justify-center relative"
                      src={currentUser?.avatar}
                      alt="profile_pic"
                      loading="lazy"
                    />
                    <span className="absolute top-2 w-3 h-3 bg-red-400 rounded-full"></span>
                  </div>
                ) : (
                  <Link
                    to="/sign-in"
                    className="text-[14px] md:text-[16px] py-1 px-2 bg-darkorange hover:bg-hoverlighttext text-white rounded-full transition-colors"
                  >
                    sign
                  </Link>
                )}
              </PopoverTrigger>
              <PopoverContent className="dark:bg-white text-darkblue">
                <div className="flex items-center justify-center mb-2">
                  <span className="font-medium">
                    {currentUser?.username}，您好
                  </span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center justify-center text-hoverlighttext text-sm mb-4"
                >
                  編輯或管理個人資料
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
                className="md:hidden absolute top-16 right-0 left-0 bg-amber-100 dark:bg-darkblue z-40"
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
