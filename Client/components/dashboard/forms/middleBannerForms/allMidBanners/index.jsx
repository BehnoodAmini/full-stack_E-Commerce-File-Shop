"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

import Box from "./Box";

const AllMidBanners = ({ setMidBanDetCtrl, setRandNumForBannerClick }) => {
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const [banners, setBanners] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numbersOfBtns, setNumbersOfBtns] = useState([-1]);
  const [filteredBtns, setFilteredBtns] = useState([-1]);
  const [allMidBannerNums, setAllMidBannerNums] = useState(0);
  const [colorFocus, setColorFocus] = useState(1);
  const paginate = 10;

  useEffect(() => {
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/middle-banners?pn=${pageNumber}&&pgn=${paginate}`,
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        setBanners(d.data.GoalMidBans);
        setNumbersOfBtns(
          Array.from(Array(Math.ceil(d.data.AllMidBansNum / paginate)).keys())
        );
        setAllMidBannerNums(d.data.AllMidBansNum);
      })
      .catch((e) => {
        toast.error("خطا در لود اطلاعات!", {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(e);
      });
  }, [pageNumber]);

  useEffect(() => {
    if (numbersOfBtns[0] != -1 && numbersOfBtns.length > 0) {
      const arr = [];
      numbersOfBtns.map((n) => {
        if (
          n == 0 ||
          (n < pageNumber + 1 && n > pageNumber - 3) ||
          n == numbersOfBtns.length - 1
        ) {
          arr.push(n);
        }
      });
      setFilteredBtns(arr);
    } else if (numbersOfBtns.length == 0) {
      setFilteredBtns([]);
    }
  }, [numbersOfBtns]);

  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center md:justify-end">
        <div className="w-32 h-10 rounded bg-indigo-600 flex justify-center items-center text-white">
          {allMidBannerNums} بنر
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {banners[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : banners.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            بنری موجود نیست...
          </div>
        ) : (
          banners.map((ba, i) => (
            <Box
              setMidBanDetCtrl={setMidBanDetCtrl}
              setRandNumForBannerClick={setRandNumForBannerClick}
              key={i}
              data={ba}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center gap-4">
        {filteredBtns[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image alt="loading" width={40} height={40} src={"/loading.svg"} />
          </div>
        ) : (
          filteredBtns.map((da, i) => (
            <button
              className={
                colorFocus == da + 1
                  ? "cursor-pointer flex justify-center items-center bg-orange-600 text-white w-8 h-8 rounded transition-all duration-300 hover:bg-orange-500"
                  : "cursor-pointer flex justify-center items-center bg-indigo-500 text-white w-8 h-8 rounded transition-all duration-300 hover:bg-orange-500"
              }
              onClick={() => {
                setPageNumber(da + 1);
                setColorFocus(da + 1);
                goTopCtrl();
              }}
              key={i}
            >
              {da + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AllMidBanners;
