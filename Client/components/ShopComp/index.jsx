"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import ProductSlideBox from "../sliders/product-slider-box";

const ShopComp = ({ url }) => {
  const goTopCtrl = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const router = useRouter();

  const [result, setResult] = useState([-1]);
  const [btns, setBtns] = useState([-1]);
  const [title, setTitle] = useState(
    url.keyword && url.keyword.length > 0
      ? unescape(url.keyword).split("_").join(" ")
      : ""
  );
  const [searchedProductNumber, setSearchedProductNumber] = useState(0);

  const [keyword, setKeyword] = useState(
    url.keyword && url.keyword.length > 0
      ? `&keyword=${unescape(url.keyword).replace(/\s+/g, "_").toLowerCase()}`
      : ""
  );
  const [orderBy, setOrderBy] = useState(
    url.orderBy ? `&orderBy=${url.orderBy}` : "&orderBy=date"
  );
  const [typeOfPro, setTypeOfPro] = useState(
    url.type ? `&type=${url.type}` : ""
  );
  const [maxPrice, setMaxPrice] = useState(
    url.maxP ? `&maxP=${url.maxP}` : "&maxP=1000000000"
  );
  const [maxPriceInputNumber, setMaxPriceInputNumber] = useState(
    url.maxP ? url.maxP : 1000000000
  ); // THIS ONE IS FOR DEFAULT VALUE
  const [minPrice, setMinPrice] = useState(
    url.minP ? `&minP=${url.minP}` : "&minP=0"
  );
  const [minPriceInputNumber, setMinPriceInputNumber] = useState(
    url.minP ? url.minP : 0
  ); // THIS ONE IS FOR DEFAULT VALUE
  const [categories, setCategories] = useState(
    url.categories ? `&categories=${url.categories}` : ""
  );
  const [pgn, setPgn] = useState(url.pgn ? `&pgn=${url.pgn}` : "&pgn=12");
  const [pn, setPn] = useState(url.pn ? `&pn=${url.pn}` : "&pn=1");

  useEffect(() => {
    const frontQueries = `${
      keyword.length > 0
        ? `&keyword=${escape(keyword.replace("&keyword=", ""))}`
        : ""
    }${orderBy ? orderBy : ""}${typeOfPro ? typeOfPro : ""}${
      maxPrice ? maxPrice : ""
    }${minPrice ? minPrice : ""}${categories ? categories : ""}${
      pgn ? pgn : ""
    }${pn ? pn : ""}`;

    const backendQueries = `${keyword.length > 0 ? keyword : ""}${
      orderBy ? orderBy : ""
    }${typeOfPro ? typeOfPro : ""}${maxPrice ? maxPrice : ""}${
      minPrice ? minPrice : ""
    }${categories ? categories : ""}${pgn ? pgn : ""}${pn ? pn : ""}`;

    const mainFrontUrl = `/shop?${frontQueries}`;
    const mainBackendUrl = `https://behnood-fileshop-server.liara.run/api/search-products?${backendQueries}`;

    goTopCtrl();
    setPgn(`&pgn=12`);
    setResult([-1]);
    setBtns([-1]);
    router.push(mainFrontUrl);
    axios.get(mainBackendUrl).then((d) => {
      setResult(d.data.allProducts);
      setBtns(d.data.btns);
      setSearchedProductNumber(d.data.productsNumber);
    });
  }, [keyword, orderBy, typeOfPro, maxPrice, minPrice, categories, pgn, pn]);

  // KEYWORD
  useEffect(() => {
    url.keyword == undefined || url.keyword.length < 1
      ? setTitle(``)
      : setTitle(unescape(url.keyword).split("_").join(" "));
    setPn(`&pn=1`);
    setKeyword(
      url.keyword && url.keyword.length > 0
        ? `&keyword=${unescape(url.keyword).replace(/\s+/g, "_").toLowerCase()}`
        : ""
    );
  }, [url.keyword]);

  // ORDER BY
  const orderByHandler = (v) => {
    setOrderBy(`&orderBy=${v.target.value}`);
    setPn(`&pn=1`);
  };

  // TYPE OF PRODUCT
  const typeOfProductHandler = (v) => {
    if (v.target.value == "allPros") {
      setTypeOfPro(``);
      url.keyword == undefined || url.keyword.length < 1
        ? setTitle(``)
        : setTitle(unescape(url.keyword).split("_").join(" "));
    } else {
      setTypeOfPro(`&type=${v.target.value}`);
      url.keyword == undefined || url.keyword.length < 1
        ? setTitle(
            v.target.value == "app"
              ? `اپلیکیشن‌های`
              : v.target.value == "gr"
              ? `محصولات گرافیکی`
              : `کتاب‌های`
          )
        : setTitle(
            v.target.value == "app"
              ? `${unescape(url.keyword).split("_").join(" ")} از اپلیکیشن ها`
              : v.target.value == "gr"
              ? `${unescape(url.keyword)
                  .split("_")
                  .join(" ")} از محصولات گرافیکی`
              : `${unescape(url.keyword).split("_").join(" ")} از کتاب ها`
          );
    }
    setPn(`&pn=1`);
  };

  // PRICE
  const minPRef = useRef();
  const maxPRef = useRef();
  const priceHandler = (e) => {
    e.preventDefault();
    if (maxPRef.current.value == "" || maxPRef.current.value < 0) {
      maxPRef.current.value = 1000000000;
    }
    if (minPRef.current.value == "" || minPRef.current.value < 0) {
      minPRef.current.value = 0;
    }
    setMaxPrice(`&maxP=${maxPRef.current.value}`);
    setMinPrice(`&minP=${minPRef.current.value}`);
    setPn(`&pn=1`);
  };

  // CATEGORIES
  const [allCats, setAllCats] = useState([-1]);
  useEffect(() => {
    const url =
      "https://behnood-fileshop-server.liara.run/api/products-categories-rel";
    axios.get(url).then((d) => {
      setAllCats(d.data);
    });
  }, []);

  const categoriesHandler = (v) => {
    if (v.target.checked) {
      if (categories.length > 0) {
        setCategories(`${categories},${v.target.value}`);
      } else {
        setCategories(`&categories=${v.target.value}`);
      }
    } else {
      const numberOfCommas = categories.split(",").length - 1;
      const a = categories.includes(`,${v.target.value}`)
        ? categories.replace(`,${v.target.value}`, "")
        : numberOfCommas == 0
        ? ""
        : categories.replace(`${v.target.value},`, "");
      setCategories(a);
    }
    setPn(`&pn=1`);
  };

  // FOR DEFAULT VALUES OF CATEGORIES
  const urlCatsSlugs = url.categories ? url.categories.split(",") : [];
  const urlCatsIds = [];
  urlCatsSlugs.map((c) => {
    for (let i = 0; i < allCats.length; i++) {
      if (c == allCats[i].slug) {
        urlCatsIds.push(allCats[i]._id);
      }
    }
  });

  // FOR RESPONSIVE
  const [menuIsOpen, setMenuIsOpen] = useState(-1);

  useEffect(() => {
    if (menuIsOpen == -1) {
      document.body.style.overflow = "auto";
    } else if (menuIsOpen == 1) {
      document.body.style.overflow = "hidden";
    }
  }, [menuIsOpen]);

  return (
    <div className="container mx-auto flex justify-between items-start gap-2 max-xl:px-2">
      <aside
        className={
          menuIsOpen == -1
            ? "z-50 flex flex-col gap-4 bg-[#000000cc] md:bg-transparent w-full md:w-80 py-4 md:py-0 h-min-[100vh] fixed md:static bottom-0 top-0 left-[100%] md:left-0 -right-[100%] md:right-0 transition-all duration-500"
            : "z-50 flex flex-col gap-4 bg-[#000000cc] md:bg-transparent backdrop-blur-md w-full md:w-80 py-4 md:py-0 h-min-[100vh] overflow-auto md:h-auto fixed md:static bottom-0 top-0 left-0 right-0 transition-all duration-500"
        }
      >
        <div className="flex flex-col gap-4 bg-transparent md:bg-zinc-100 rounded-lg p-2 max-md:mt-12">
          <div className="max-md:text-white">مرتب سازی بر اساس</div>
          <div className="flex gap-2 items-center flex-wrap justify-center 2xl:justify-between cursor-pointer">
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="date">
                جدیدترین
              </label>
              {orderBy == "&orderBy=date" ? (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="date"
                  value={"date"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="date"
                  value={"date"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="price">
                قیمت
              </label>
              {orderBy == "&orderBy=price" ? (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="price"
                  value={"price"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="price"
                  value={"price"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="pageView">
                پر بازدیدترین
              </label>
              {orderBy == "&orderBy=pageView" ? (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="pageView"
                  value={"pageView"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="pageView"
                  value={"pageView"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="buyNumber">
                پر فروش‌ترین
              </label>
              {orderBy == "&orderBy=buyNumber" ? (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="buyNumber"
                  value={"buyNumber"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={orderByHandler}
                  type="radio"
                  name="orderBy"
                  id="buyNumber"
                  value={"buyNumber"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-transparent md:bg-zinc-100 rounded-lg p-2">
          <div className="max-md:text-white">نوع محصول</div>
          <div className="flex gap-2 items-center flex-wrap justify-center 2xl:justify-between cursor-pointer">
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="allPros">
                همه
              </label>
              {typeOfPro == "" ? (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="allPros"
                  value={"allPros"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="allPros"
                  value={"allPros"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="app">
                اپلیکیشن
              </label>
              {typeOfPro == "&type=app" ? (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="app"
                  value={"app"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="app"
                  value={"app"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="book">
                کتاب
              </label>
              {typeOfPro == "&type=book" ? (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="book"
                  value={"book"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="book"
                  value={"book"}
                />
              )}
            </div>
            <div className="flex basis-[41%] gap-1 items-center justify-center md:bg-transparent bg-zinc-100 w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded">
              <label className="cursor-pointer" htmlFor="gr">
                فایل گرافیکی
              </label>
              {typeOfPro == "&type=gr" ? (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="gr"
                  value={"gr"}
                  defaultChecked
                />
              ) : (
                <input
                  className="cursor-pointer"
                  onClick={typeOfProductHandler}
                  type="radio"
                  name="typeOfProduct"
                  id="gr"
                  value={"gr"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-transparent md:bg-zinc-100 rounded-lg p-2">
          <div className="max-md:text-white">بازه قیمت(تومان)</div>
          <form onSubmit={priceHandler} className="flex gap-4 flex-col">
            <div className="flex gap-2 items-center flex-wrap justify-center 2xl:justify-between">
              <input
                className="inputLtr md:bg-transparent bg-zinc-100 text-center w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 outline-none focus:border-indigo-600 rounded"
                type="number"
                placeholder="حداقل قیمت"
                ref={minPRef}
                defaultValue={minPriceInputNumber}
                min={0}
              />
              <input
                className="inputLtr md:bg-transparent bg-zinc-100 text-center w-28 h-10 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 outline-none focus:border-indigo-600 rounded"
                type="number"
                placeholder="حداکثر قیمت"
                ref={maxPRef}
                defaultValue={maxPriceInputNumber}
                min={0}
              />
            </div>
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-500 p-2 rounded h-10 flex justify-center items-center text-white transition-all duration-300 hover:bg-indigo-600"
            >
              اعمال فیلتر قیمت
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 bg-transparent md:bg-zinc-100 rounded-lg p-2">
          <div className="max-md:text-white">دسته بندی</div>
          <div className="flex gap-2 items-center flex-wrap justify-between">
            {allCats[0] == -1 ? (
              <div className="w-full flex justify-center items-center p-12">
                <Image
                  alt="loading"
                  width={40}
                  height={40}
                  src={"/loading.svg"}
                />
              </div>
            ) : allCats.length < 1 ? (
              <div>دسته‌ای وجود ندارد.</div>
            ) : (
              <div className="flex justify-center items-center w-full">
                <div className="flex gap-2 flex-wrap justify-around items-center cursor-pointer">
                  {allCats.map((da, i) => (
                    <div
                      key={i}
                      className="md:bg-transparent bg-zinc-100 w-full h-12 flex gap-1 items-center justify-between p-2 text-base sm:text-xs border-2 border-zinc-200 transition-all duration-300 hover:border-indigo-600 rounded"
                    >
                      <label className="cursor-pointer" htmlFor={da.slug}>
                        {da.title}
                      </label>
                      {urlCatsIds.length < 1 ? (
                        <input
                          className="cursor-pointer"
                          onClick={categoriesHandler}
                          type="checkbox"
                          id={da.slug}
                          value={da.slug}
                        />
                      ) : (
                        <input
                          className="cursor-pointer"
                          onClick={categoriesHandler}
                          type="checkbox"
                          id={da.slug}
                          value={da.slug}
                          defaultChecked={urlCatsIds.includes(da._id)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
      <main className="bg-zinc-100 rounded-lg p-2 w-full flex flex-col gap-8 mt-12 md:mt-0">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-indigo-600">محصولات {title} فروشگاه</h1>
          <div className="text-sm rounded-md border-2 border-indigo-600 w-20 h-8 flex justify-center items-center">
            {searchedProductNumber} محصول
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <section className="flex justify-center lg:justify-between items-center gap-4 flex-wrap">
            {result[0] == -1 ? (
              <div className="w-full flex justify-center items-center p-12">
                <Image
                  alt="loading"
                  width={120}
                  height={120}
                  src={"/loading.svg"}
                />
              </div>
            ) : result.length < 1 ? (
              <div>محصولی با این مشخصات موجود نیست...</div>
            ) : (
              result.map((da, i) => <ProductSlideBox key={i} itemData={da} />)
            )}
          </section>
          <section className="flex justify-center items-center gap-4 flex-wrap">
            {btns[0] == -1 ? (
              <div className="w-full flex justify-center items-center p-12">
                <Image
                  alt="loading"
                  width={50}
                  height={50}
                  src={"/loading.svg"}
                />
              </div>
            ) : (
              btns.map((da, i) => (
                <button
                  onClick={() => {
                    setPgn(`&pgn=12`);
                    setPn(`&pn=${da + 1}`);
                    goTopCtrl();
                    setResult([-1]);
                  }}
                  className={
                    pn == `&pn=${da + 1}`
                      ? "cursor-pointer w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-300 bg-indigo-500 text-white hover:text-zinc-700 hover:bg-[#571fdb2a]"
                      : "cursor-pointer w-8 h-8 rounded border-2 border-indigo-500 transition-all duration-300 hover:bg-[#571fdb2a]"
                  }
                  key={i}
                >
                  {da + 1}
                </button>
              ))
            )}
          </section>
        </div>
      </main>
      <div className="z-50 flex md:hidden fixed top-2 right-4 bg-[#0093b8cb] rounded-full p-1 border-2 border-white">
        <FaFilter
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == -1
              ? "w-10 h-10 text-white flex p-2"
              : "w-10 h-10 text-white hidden"
          }
        />
        <IoMdClose
          onClick={() => {
            setMenuIsOpen(menuIsOpen * -1);
          }}
          className={
            menuIsOpen == 1
              ? "w-10 h-10 text-white flex"
              : "w-10 h-10 text-white hidden"
          }
        />
      </div>
    </div>
  );
};

export default ShopComp;
