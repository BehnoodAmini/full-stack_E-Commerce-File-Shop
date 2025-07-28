"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

import Box from "./Box";

const AllProducts = ({ setProductDetCtrl, setRandNumForProductClick }) => {
  const [authCookie, setAuthCookie] = useState(Cookies.get("auth_cookie"));

  const [products, setProducts] = useState([-1]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numbersOfBtns, setNumbersOfBtns] = useState([-1]);
  const [filteredBtns, setFilteredBtns] = useState([-1]);
  const [allProductsNumber, setAllProductsNumber] = useState(0);
  const [colorFocus, setColorFocus] = useState(1);
  const paginate = 10;
  const [categoryUrl, setCategoryUrl] = useState("products");

  useEffect(() => {
    axios
      .get(
        `https://behnood-fileshop-server.liara.run/api/${categoryUrl}?pn=${pageNumber}&&pgn=${paginate}`,
        {
          headers: { auth_cookie: authCookie },
        }
      )
      .then((d) => {
        setProducts(d.data.GoalProducts);
        setNumbersOfBtns(
          Array.from(Array(Math.ceil(d.data.AllProductsNum / paginate)).keys())
        );
        setAllProductsNumber(d.data.AllProductsNum);
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
  }, [pageNumber, categoryUrl]);

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
      <div className="flex justify-center md:justify-end items-center gap-2">
        <div className="text-xs text-white flex justify-center md:justify-end items-center gap-4 w-32 h-10">
          <select
            className="cursor-pointer text-sm p-2 rounded w-full text-black border-2 border-indigo-300 focus:border-orange-400 focus:outline-none"
            onChange={(event) => {
              const selectedValue = event.target.value;
              if (selectedValue === "products") {
                setCategoryUrl("products");
                setPageNumber(1);
              } else if (selectedValue === "book") {
                setCategoryUrl("get-products-of-type/book");
                setPageNumber(1);
              } else if (selectedValue === "app") {
                setCategoryUrl("get-products-of-type/app");
                setPageNumber(1);
              } else if (selectedValue === "gr") {
                setCategoryUrl("get-products-of-type/gr");
                setPageNumber(1);
              }
            }}
          >
            <option value="products">همه دسته‌ها</option>
            <option value="book">کتاب</option>
            <option value="app">اپلیکیشن</option>
            <option value="gr">فایل گرافیکی</option>
          </select>
        </div>
        <div className="w-32 h-10 rounded bg-indigo-600 flex justify-center items-center text-white">
          {allProductsNumber} محصول
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {products[0] == -1 ? (
          <div className="flex justify-center items-center p-12">
            <Image
              alt="loading"
              width={120}
              height={120}
              src={"/loading.svg"}
            />
          </div>
        ) : products.length < 1 ? (
          <div className="flex justify-center items-center w-full p-8">
            محصولی موجود نیست...
          </div>
        ) : (
          products.map((da, i) => (
            <Box
              setProductDetCtrl={setProductDetCtrl}
              setRandNumForProductClick={setRandNumForProductClick}
              key={i}
              data={da}
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

export default AllProducts;
