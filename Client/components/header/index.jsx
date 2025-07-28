"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { BsTelegram } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsYoutube } from "react-icons/bs";
import { BsTelephoneFill } from "react-icons/bs";
import { IoMailOpenOutline } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { IoPerson } from "react-icons/io5";
import { HiShoppingCart } from "react-icons/hi";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import { useAppContext } from "@/context/appContext";

const Header = () => {
  // CONTEXT OF CART NUMBER
  const { cartNumber } = useAppContext();

  const [logohover, setLogohover] = useState(0);
  // FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);
  // STATE TO STORE SEARCH RESULTS FOR AJAX DROPDOWN
  const [searchResults, setSearchResults] = useState([]);
  // STATE TO CONTROL VISIBILITY OF SEARCH RESULTS DROPDOWN
  const [showSearchResults, setShowSearchResults] = useState(false);
  // STATE FOR SEARCH LOADING STATUS
  const [loadingSearch, setLoadingSearch] = useState(false);
  // STATE FOR SEARCH TERM TO UPDATE RESULTS DYNAMICALLY AND CONTROL INPUT VALUE
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const searchRef = useRef();

  // FUNCTION TO HANDLE FORM SUBMISSION (ENTER KEY OR BUTTON CLICK)]
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMenuIsOpen(-1);

    const keyword = searchRef.current.value.trim();
    if (keyword.length > 0) {
      const url = `/shop?keyword=${encodeURIComponent(keyword)}`;
      router.push(url);
      setSearchTerm(""); // CLEAR SEARCH INPUT AFTER SUBMISSION
      setSearchResults([]); // CLEAR DROPDOWN RESULTS
      setShowSearchResults(false);
    } else {
      toast.error("فرم جستجو خالی است!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // FUNCTION TO HANDLE INPUT CHANGE FOR DYNAMIC AJAX SEARCH
  const handleInputChange = async (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.length > 2) {
      setLoadingSearch(true);
      setShowSearchResults(true);
      try {
        const response = await fetch(
          `https://behnood-fileshop-server.liara.run/api/search-products?keyword=${encodeURIComponent(
            keyword
          )}`
        );
        if (!response.ok) {
          console.error(
            `Network response was not ok: Status ${response.status} - ${response.statusText}`
          );
          const errorBody = await response.text();
          console.error("Error response body:", errorBody);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data.allProducts || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        toast.error("خطا در جستجو! لطفاً دوباره تلاش کنید.", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSearchResults([]);
      } finally {
        setLoadingSearch(false);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // CLOSE SEARCH RESULTS WHEN CLICKING OUTSIDE THE FORM
  useEffect(() => {
    const handleClickOutside = (event) => {
      // CHECK IF THE CLICK IS OUTSIDE THE SEARCH INPUT AND RESULTS DROPDOWN
      if (
        searchRef.current &&
        !searchRef.current.closest("form").contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    if (menuIsOpen === -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen === 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <header className="container mx-auto py-2 relative z-60 md:mb-50">
      <div
        className={
          menuIsOpen === -1
            ? "flex bg-[#000000cc] md:bg-white w-full py-4 md:py-0 h-[100vh] md:h-52 fixed md:absolute bottom-0 top-0 -left-[100%] md:left-0 right-[100%] md:right-0 transition-all duration-500"
            : "flex bg-[#000000cc] md:bg-white backdrop-blur-md w-full py-4 md:py-0 h-[100vh] md:h-52 fixed md:absolute bottom-0 top-0 left-0 right-0 transition-all duration-500"
        }
      >
        <div className="w-full flex-col md:flex-row flex justify-start md:justify-between items-center md:items-start gap-6 md:gap-4">
          <div className="flex flex-col relative h-36 md:h-52 w-48 items-center">
            <Link
              href={"/"}
              onMouseEnter={() => setLogohover(1)}
              onMouseLeave={() => setLogohover(0)}
              onClick={() => setMenuIsOpen(-1)}
              className="z-40 bg-[#f5f4f7] logo p-5 rounded-lg shadow-[0px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0px_1px_10px_rgba(0,0,0,0.5)] text-center"
            >
              <div className="flex justify-center">
                <Image
                  src={"/logo.jpg"}
                  className="rounded-lg"
                  width={100}
                  height={100}
                  alt="shop logo"
                />
              </div>
              <div className="text-sm xl:text-base">فروشگاه فایل</div>
            </Link>
            <div
              onMouseEnter={() => setLogohover(1)}
              onMouseLeave={() => setLogohover(0)}
              className={
                logohover === 0
                  ? "hidden md:flex z-30 absolute bottom-20 right-0 left-0 justify-around items-center text-[1.5rem] p-2 text-indigo-600 rounded-br-md rounded-bl-md transition-all duration-500"
                  : "hidden md:flex z-30 absolute bottom-3 right-0 left-0 justify-around items-center text-[1.5rem] p-2 text-indigo-600 rounded-lg rounded-bl-md transition-all duration-500"
              }
            >
              <Link
                href="https://web.telegram.org/"
                className="transition-all duration-300 hover:text-orange-500!"
                target={"_blank"}
              >
                <BsTelegram />
              </Link>
              <Link
                href="https://youtube.com/"
                className="transition-all duration-300 hover:text-orange-500!"
                target={"_blank"}
              >
                <BsYoutube />
              </Link>
              <Link
                href="https://x.com/"
                className="transition-all duration-300 hover:text-orange-500!"
                target={"_blank"}
              >
                <FaSquareXTwitter />
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 py-4 h-40 justify-between">
            <div className="flex-col md:flex-row flex justify-between items-center w-full">
              <nav className="">
                <ul className="flex-col md:flex-row flex items-center justify-start gap-2">
                  <li>
                    <Link
                      href="/"
                      onClick={() => setMenuIsOpen(-1)}
                      className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white!"
                    >
                      خانه
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shop"
                      target={"_blank"}
                      onClick={() => setMenuIsOpen(-1)}
                      className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white!"
                    >
                      فروشگاه
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      onClick={() => setMenuIsOpen(-1)}
                      className="w-32 h-10 rounded-md bg-zinc-200 flex justify-center items-center transition-all duration-300 hover:bg-orange-400 hover:text-white!"
                    >
                      وبلاگ
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="hidden md:flex flex-col items-end gap-2 ">
                <div className="flex gap-2 items-center">
                  <div className="text-sm xl:text-base">09123456789</div>
                  <div className="rounded bg-slate-200 rotate-12 p-2">
                    <BsTelephoneFill className="w-4 h-4 -rotate-12" />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="text-sm xl:text-base">example@email.com</div>
                  <div className="rounded bg-slate-200 rotate-12 p-2">
                    <IoMailOpenOutline className="w-4 h-4 -rotate-12" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col md:flex-row gap-4 md:gap-0 flex justify-between items-center">
              <form
                onSubmit={handleFormSubmit}
                className="relative flex justify-start items-center w-3/4 md:w-2/3 xl:w-full md:ml-8 bg-zinc-100 rounded-lg border-1 border-zinc-200"
              >
                <input
                  ref={searchRef}
                  className="outline-none w-full h-[3.2rem] p-3 rounded-lg shadow-[0px_0px_5px_rgba(0,0,0,.15)] transition-all duration-500 focus:shadow-[0px_3px_7px_rgba(0,0,0,0.25)]"
                  type="text"
                  placeholder="جستجو بین محصولات..."
                  onChange={handleInputChange}
                  value={searchTerm}
                  onFocus={() => {
                    if (searchTerm.length > 2 && searchResults.length > 0) {
                      setShowSearchResults(true);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="w-10 absolute left-0 cursor-pointer"
                >
                  <BiSearchAlt className="w-8 h-8" />
                </button>
                {/* SEARCH RESULTS DROPDOWN FOR AJAX */}
                {showSearchResults &&
                  (loadingSearch ||
                    searchResults.length > 0 ||
                    searchTerm.length > 0) && (
                    <div className="absolute top-full right-0 left-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                      {loadingSearch ? (
                        <div className="p-4 text-center text-gray-500">
                          در حال جستجو...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <ul>
                          {searchResults.map((result) => (
                            <li
                              key={result._id}
                              className="border-b border-gray-100 last:border-b-0"
                            >
                              <Link
                                href={`/shop/${result.slug}`}
                                className="block p-3 hover:bg-gray-100"
                                onClick={() => {
                                  setShowSearchResults(false);
                                  setSearchTerm(result.title);
                                }}
                              >
                                {result.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        searchTerm.length > 0 && (
                          <div className="p-4 text-center text-gray-500">
                            نتیجه‌ای یافت نشد.
                          </div>
                        )
                      )}
                    </div>
                  )}
              </form>
              <div className="flex items-center justify-center md:justify-end gap-4 w-full md:w-[20rem]">
                <Link href="/account/info" onClick={() => setMenuIsOpen(-1)}>
                  <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 md:shadow-indigo-400 md:shadow-[1px_3px_5px_rgba(0,0,0,.05)] transition-all duration-300 hover:shadow-[0px_0.5rem_0.5rem_rgba(0,0,0,.3)]">
                    <IoPerson className="text-white w-6 h-6" />
                  </div>
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMenuIsOpen(-1)}
                  className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white rounded-xl py-2 px-4 md:shadow-orange-300 md:shadow-[1px_3px_5px_rgba(0,0,0,.05)] transition-all duration-300 hover:shadow-[0.5rem_0.5rem_1rem_rgba(0,0,0,.35)]"
                >
                  <div className="w-7 h-7 bg-white text-orange-500 text-sm font-bold rounded-full flex items-center justify-center shadow">
                    {cartNumber === -1 ? <div></div> : cartNumber}
                  </div>
                  <span className="text-sm font-medium text-white">
                    سبد خرید
                  </span>
                  <div className="w-8 h-8 bg-white text-orange-500 rounded-lg flex items-center justify-center shadow">
                    <HiShoppingCart className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50 flex md:hidden fixed top-2 left-4 bg-[#0093b8cb] rounded-full p-1 border-2 border-white">
        <BiMenu
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen === -1
              ? "w-10 h-10 text-white flex"
              : "w-10 h-10 text-white hidden"
          }
        />
        <IoMdClose
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen === 1
              ? "w-10 h-10 text-white flex"
              : "w-10 h-10 text-white hidden"
          }
        />
      </div>
    </header>
  );
};

export default Header;
